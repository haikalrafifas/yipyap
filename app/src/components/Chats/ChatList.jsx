import { useLocalData } from "../../context/LocalDataContext";

const ChatList = ({ onChooseRoom }) => {
  const { localData } = useLocalData();

  return (
    <ul>
      {localData?.rooms?.map(room => {
        const lastMessage = room.message;
        const lastMessageText = lastMessage ? lastMessage.message : 'No messages yet';
        const lastMessageTime = lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString() : ''; // Format timestamp
        const isRead = lastMessage ? lastMessage.read : false; // Assuming there's a 'read' property

        return (
          <li
            key={room.id}
            onClick={() => onChooseRoom(room.id)}
            className="flex items-center cursor-pointer p-2 hover:bg-gray-200"
          >
            <img
              src={room.image || '/uploads/users/default.jpg'} // Default image if none
              alt={`${room.name}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-bold">{room.name}</h3>
                <span className={`text-xs ${isRead ? 'text-gray-500' : 'text-blue-500'}`}>
                  {isRead ? 'Read' : 'Unread'}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{lastMessageText}</p>
              {lastMessageTime && (
                <span className="text-gray-400 text-xs">{lastMessageTime}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ChatList;
