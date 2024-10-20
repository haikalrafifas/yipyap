// import pool from "../../../../database/connection";
// import unitCollection from "../../../../database/collections/unitCollection";

// /api/units/:device_id/edit
export default async function handler(req, res) {
  // const device_id = req.url.split('/')[3];

  switch (req.method) {
    case 'GET':
      res.status(200).json({message: 'USER ID EDIT'});
      break;



    // case 'POST':
    //   // Update a unit
    //   const { name } = req.body;

    //   try {
    //     const { rows } = await pool.query(
    //       'UPDATE units SET name = $2 WHERE device_id = $1 RETURNING *',
    //       [device_id, name || 'Unknown'],
    //     );

    //     if (rows.length === 0) {
    //       return res.status(404).json({ error: 'Unit not found!' });
    //     }

    //     return res.status(200).json({
    //       message: 'Successfully updated a unit!',
    //       data: unitCollection.single(rows[0]),
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Error updating a unit!' });
    //   }
    //   break;



    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
