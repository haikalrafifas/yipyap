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



  latest: (rows, as) => {
    if (!rows.length) return [];
  
    const result = [];
    const usersMap = new Map();
    const groupsMap = new Map();
  
    rows.forEach(row => {
      if (!row.to_group) {
        // Specify chat room
        let room = '';
        let roomname = '';
        if (row.from === as) {
          room = `${as}:${row.to}`;
        } else if (row.to === as) {
          room = `${as}:${row.from}`;
        }
        
        // User Message
        if (!usersMap.has(room)) {
          usersMap.set(room, {
            username: row.room,
            name: row.name,
            description: row.description,
            image: row.image,
            status: {
              is_online: row.is_online,
              last_seen: row.last_seen,
            },
            message: {
              to: row.to,
              message: row.message,
              timestamp: row.created_at,
              is_read: row.read_by ? row.read_by.includes(row.from) : false,
            },
          });
        }
      } else {
        // Group Message
        if (!groupsMap.has(row.to)) {
          groupsMap.set(row.to, {
            groupname: row.to,
            name: row.name,
            description: row.description,
            image: row.image,
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
  
        groupsMap.get(row.to).message = messageEntry;
      }
    });
  
    result.push(...Array.from(usersMap.values()));
    result.push(...Array.from(groupsMap.values()));
  
    return result;
  },



  each: (rows) => {
    if (!rows.length) return [];

    const result = [];

    rows.forEach(row => {
      result.push({
        from: row.from_username,
        to: row.to_username,
        message: row.message,
        attachments: row.attachments,
        created_at: row.created_at,
        updated_at: row.updated_at,
        deleted_at: row.deleted_at,
      });
    });
    
    return result;
  },
};

module.exports = messageCollection;
  