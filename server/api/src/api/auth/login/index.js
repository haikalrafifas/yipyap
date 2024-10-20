// import pool from '../../database/connection';
// import { nanoid } from 'nanoid';
// import unitCollection from '../../database/collections/unitCollection';

// /api/units
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      res.status(200).json({message: 'Hello!'});
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
  