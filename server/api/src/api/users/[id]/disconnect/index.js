import pool from "../../../../database/connection";
import unitCollection from "../../../../database/collections/unitCollection";

// /api/units/:device_id/disconnect
export default async function handler(req, res) {
  const device_id = req.url.split('/')[3];

  switch (req.method) {
    case 'GET':
      try {
        // Check if the unit exists
        const { rows } = await pool.query(
          'SELECT id FROM units WHERE device_id = $1',
          [device_id],
        );

        if (rows.length === 0) {
          return res.status(404).json({ error: 'Unit not found!' });
        }

        const unit_id = rows[0].id;

        // Update unit state
        await pool.query(
          'UPDATE unit_status SET is_online=$2 WHERE unit_id=$1',
          [unit_id, false],
        );
    
        res.status(200).json({
          message: 'Successfully disconnected a unit!',
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error disconnecting a unit!' });
      }
      break;

      

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end('Method Not Allowed');
      break;
  }
}
