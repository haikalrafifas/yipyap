import pool from "../../../database/connection";
import userCollection from "../../../database/collections/userCollection";
import { sign } from "../../../utils/jwt";
// import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({message: 'Hello!'});
      break;
    


    case 'POST':
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          status: 400,
          message: 'Missing required fields!',
        });
      }

      try {
        const { rows } = await pool.query(`
          SELECT * FROM users WHERE username=$1 AND password=$2
          `,
          [username, password],
        );

        if (rows.length === 0) {
          return res.status(404).json({
            status: 404,
            message: 'User not found!',
          });
        }

        const user = userCollection.single(rows[0]);
        const token = sign(user);

        return res.status(200).json({
          status: 200,
          message: 'Successfully authenticate user!',
          data: { token, user },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          message: 'Error while authenticating user!',
        });
      }
      break;



    // case 'GET':
    //   // Get all units
    //   const maxRows = 100;

    //   try {
    //     const { rows } = await pool.query(
    //       `SELECT * FROM units LIMIT $1`,
    //       [maxRows],
    //     );
    //     res.status(200).json({
    //       message: 'Successfully get all units!',
    //       data: unitCollection.many(rows),
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Error fetching units: ' });
    //   }
    //   break;



    // case 'POST':
    //   // Create a new unit
    //   const { device_id, name } = req.body;

    //   // Basic validation
    //   if (!name) {
    //     return res.status(400).json({ error: 'Missing required fields: name' });
    //   }

    //   try {
    //     const { rows } = await pool.query(
    //       'INSERT INTO units (id, name) VALUES ($1, $2) RETURNING *',
    //       [device_id || nanoid(), name],
    //     );

    //     res.status(201).json({
    //       message: 'Successfully created a new unit!',
    //       data: unitCollection.single(rows[0]),
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Error creating a new unit!' });
    //   }
    //   break;



    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
  