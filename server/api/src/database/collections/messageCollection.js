const messageCollection = {
  complete: (rows, as) => {
    if (!rows.length) return [];
  
    const result = [];
    const usersMap = new Map();
    const groupsMap = new Map();
  
    rows.forEach(row => {
      if (!row.to_group) {
        // Specify chat room
        let room = '';
        if (row.from === as) {
          room = `${as}:${row.to}`;
        } else if (row.to === as) {
          room = `${as}:${row.from}`;
        }
        
        // User Message
        if (!usersMap.has(room)) {
          usersMap.set(room, {
            username: row.from,
            name: row.name,
            description: row.description,
            image: row.image,
            status: {
              is_online: row.is_online,
              last_seen: row.last_seen,
            },
            messages: []
          });
        }
  
        usersMap.get(room).messages.push({
          to: row.to,
          message: row.message,
          timestamp: row.created_at,
          is_read: row.read_by ? row.read_by.includes(row.from) : false,
        });
      } else {
        // Group Message
        if (!groupsMap.has(row.to)) {
          groupsMap.set(row.to, {
            groupname: row.to,
            name: row.name,
            description: row.description,
            image: row.image,
            messages: []
          });
        }
  
        const messageEntry = {
          from: row.from,
          message: row.message,
          timestamp: row.created_at,
          read_by: []
        };
  
        if (row.timestamp) {
          messageEntry.read_by.push({
            username: row.from,
            timestamp: row.timestamp,
          });
        }
  
        groupsMap.get(row.to).messages.push(messageEntry);
      }
    });
  
    result.push(...Array.from(usersMap.values()));
    result.push(...Array.from(groupsMap.values()));
  
    return result;
  },
};

module.exports = messageCollection;
  