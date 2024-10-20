const userCollection = {
    single: (row) => {
      return {
        username: row.username,
        name: row.name,
        description: row.description,
        image: row.image,
        status: {
          is_online: row.is_online,
          last_seen: row.last_seen,
        },
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
    },
    
    many: (rows) => {
      return rows.map(row => ({
        device_id: row.device_id,
        name: row.name,
      }));
    },
  
    complete: (rows) => {
      if (!rows.length) return null; // Handle empty case
  
      const result = {
        device_id: rows[0].device_id,
        name: rows[0].name,
        status: {
          is_online: rows[0].is_online,
          is_switch_on: rows[0].is_switch_on,
          is_difflock_on: rows[0].is_difflock_on,
          is_error: rows[0].is_error,
          updated_at: rows[0].updated_at,
        },
        errors: [],
      };
  
      // Accumulate errors from all rows
      rows.forEach(row => {
        if (row.message) {
          result.errors.push({
            message: row.message,
            is_switch_on: row.is_switch_on,
            is_difflock_on: row.is_difflock_on,
            timestamp: row.timestamp,
          });
        }
      });
  
      return result;
    },
  };
  
  module.exports = userCollection;
  