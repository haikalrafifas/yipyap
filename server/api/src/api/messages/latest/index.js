import pool from "../../../database/connection";
import messageCollection from "../../../database/collections/messageCollection";
import authMiddleware from "../../../middlewares/authMiddleware";

export default async function handler(req, res) {
  const token = authMiddleware(req, res);
  const username = token?.username;

  switch (req.method) {
    case 'GET':
      const maxRows = 100;
      try {
        const { rows: user } = await pool.query(`
          SELECT * FROM users WHERE username = $1
          `,
          [username],
        );

        if (user.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'User not found!',
          });
        }

        const userId = user[0].id;

        const { rows } = await pool.query(`
          SELECT 
            m.id, 
            u_from.username AS from, 
            u_to.username AS to, 
            m.message, 
            m.created_at,
            CASE 
              WHEN m.from = $1 THEN u_to.name
              WHEN m.to = $1 THEN u_from.name
              ELSE NULL
            END AS name, 
            CASE 
              WHEN m.from = $1 THEN u_to.description
              WHEN m.to = $1 THEN u_from.description
              ELSE NULL
            END AS description, 
            CASE 
              WHEN m.from = $1 THEN u_to.image
              WHEN m.to = $1 THEN u_from.image
              ELSE NULL
            END AS image, 
            COALESCE(u_from.is_online::text, 'false') AS is_online, 
            COALESCE(u_from.last_seen::text, 'N/A') AS last_seen, 
            m.to_group, 
            CASE 
              WHEN m.from = $1 THEN u_to.username
              WHEN m.to = $1 THEN u_from.username
              ELSE NULL
            END AS room
          FROM messages m
          JOIN users u_from ON m.from = u_from.id
          JOIN users u_to ON m.to = u_to.id
          WHERE (m.from = $1 OR m.to = $1) AND m.to_group = false
      
          UNION ALL
      
          SELECT 
            m.id, 
            u_from.username AS from, 
            g.groupname AS to, 
            m.message, 
            m.created_at, 
            g.name, 
            g.description, 
            g.image, 
            NULL::text AS is_online, 
            NULL::text AS last_seen, 
            true AS to_group, 
            NULL AS room
          FROM messages m
          JOIN users u_from ON m.from = u_from.id
          JOIN groups g ON m.to = g.id
          JOIN group_members gm ON g.id = gm.group_id
          WHERE gm.user_id = $1 AND m.to_group = true
      
          ORDER BY created_at DESC
          LIMIT $2;
      `, [userId, maxRows]);

        return res.status(200).json({
          status: 200,
          message: 'Successfully get latest user messages!',
          data: messageCollection.latest(rows, username),
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: 'Error while retrieving latest user messages!',
        });
      }
      break;



      // case 'POST':
      // // Update a unit state
      // const { name, status, error } = req.body;
    
      // // Validate required fields
      // if (status === undefined) {
      //   return res.status(400).json({ error: 'Missing required fields: status' });
      // }
    
      // // Payload object default values
      // const is_switch_on = status?.is_switch_on || false;
      // const is_difflock_on = status?.is_difflock_on || false;
      // const message = error?.message || 'Invalid Error Message';
      // const timestamp = error?.timestamp || new Date().toISOString();
    
      // try {
      //   // Register new unit if not exist
      //   await pool.query('BEGIN');

      //   const { rows } = await pool.query(
      //     'SELECT id FROM units WHERE device_id=$1',
      //     [device_id],
      //   );

      //   // Get unit id
      //   let unitId;
      //   if (rows.length) {
      //     unitId = rows[0].id;
      //   } else {
      //     const insertResult = await pool.query(
      //       'INSERT INTO units (device_id, name) VALUES ($1, $2) RETURNING id',
      //       [device_id, name || 'Unknown'],
      //     );
      //     unitId = insertResult.rows[0].id;
      //   }
    
      //   // Update unit state
      //   await pool.query(
      //     `INSERT INTO unit_status (unit_id, is_online, is_switch_on, is_difflock_on, is_error)
      //       VALUES ($1, $2, $3, $4, $5)
      //       ON CONFLICT (unit_id) 
      //       DO UPDATE SET 
      //         is_online = EXCLUDED.is_online,
      //         is_switch_on = EXCLUDED.is_switch_on,
      //         is_difflock_on = EXCLUDED.is_difflock_on,
      //         is_error = EXCLUDED.is_error`,
      //     [unitId, true, is_switch_on, is_difflock_on, error !== undefined],
      //   );
    
      //   if (error) {
      //     // Add unit error log
      //     await pool.query(
      //       'INSERT INTO unit_messages (unit_id, message, timestamp) VALUES ($1, $2, $3)',
      //       [unitId, message, timestamp],
      //     );
      //   }

      //   await pool.query('COMMIT');
    
      //   return res.status(200).json({ message: 'Successfully update unit state!' });
      // } catch (error) {
      //   await pool.query('ROLLBACK');
      //   console.error('Error updating a unit state:', error);
      //   res.status(500).json({ error: 'Error updating a unit state!' });
      // }
      // break;



    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
