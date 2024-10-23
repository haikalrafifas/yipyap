const { parse } = require('url');
import pool from "../../../../database/connection";
import messageCollection from "../../../../database/collections/messageCollection";
import authMiddleware from "../../../../middlewares/authMiddleware";

export default async function handler(req, res) {
  const token = authMiddleware(req, res);
  const username = token?.username;

  const { pathname } = parse(req.url, true);
  const groupname = pathname.split('/')[4];

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

        const { rows: group } = await pool.query(`
          SELECT * FROM groups WHERE groupname = $1
          `,
          [groupname],
        );
        if (group.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'Group chat room not found!',
          });
        }

        const userId = user[0].id;
        const groupId = group[0].id;

        const { rows } = await pool.query(`
          SELECT
            m.*, 
            u_from.username as from_username
          FROM messages m 
          JOIN users u_from ON m.from = u_from.id
          JOIN groups g ON m.to = g.id
          WHERE m.to = $1 AND m.to_group = true
          ORDER BY m.created_at DESC
          LIMIT $2
      `, [groupId, maxRows]);

        return res.status(200).json({
          status: 200,
          message: 'Successfully get group messages!',
          data: messageCollection.each(rows),
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: 'Error while retrieving user messages!',
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
