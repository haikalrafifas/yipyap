import { useState, useEffect } from 'react';
import LoadingSpinner from '../Overlays/LoadingSpinner';
import { getToken } from '../../utils/token';
import { useLocalData } from '../../context/LocalDataContext';
import { useIsMobile } from '../../utils/viewport';

const MAX_LINES = 3;

const ChatWindow = ({ chosenRoom, onAddMessage, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({});
  const isMobile = useIsMobile();

  const { localData, setLocalData } = useLocalData();
  const username = localData.user.username;

  const handleSendMessage = () => {
    if (message.trim()) {
      onAddMessage({ text: message, from: 'user1' });
      setMessage('');
    }
  };

  useEffect(() => {
    const getCurrentRoomData = () => {
      return localData.rooms.find(room => room.id === chosenRoom);
    };

    const fetchData = async (type) => {
      setLoading(true);

      try {
        const token = getToken();
        const response = await fetch(`/api/messages/${type}/${chosenRoom}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          return window.location.reload();
        }

        const data = await response.json();
        return data?.data?.reverse() || [];
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      } finally {
        setLoading(false);
      }
    };
    
    const updateMessages = async () => {
      const currentRoom = getCurrentRoomData();
      const roomMessages = currentRoom.messages;

      setRoomData(currentRoom);
  
      if (roomMessages.length === 0) {
        // Only fetch if messages are empty
        const fetchedMessages = await fetchData(currentRoom.type);
  
        const updatedRoom = {
          ...currentRoom,
          messages: fetchedMessages,
        };

        setMessages(fetchedMessages);
        
        // Update local state with new messages
        setLocalData({
          rooms: localData.rooms.map(room => (room.id === chosenRoom ? updatedRoom : room)),
        });
      } else {
        setMessages(roomMessages);
        setRoomData(getCurrentRoomData());
      }
    };
  
    setMessages([]);
    setRoomData([]);
    updateMessages();
  }, [chosenRoom]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 bg-white border-b shadow">
        {isMobile && (
          <button onClick={onBack} className="mr-2 text-blue-500">Back</button>
        )}
        <img 
          src={roomData.image || '/uploads/users/default.jpg'} 
          alt={`${roomData.name}'s profile`} 
          className="w-12 h-12 rounded-full mr-3" 
        />
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">{roomData.name}</h2>
          <p className="text-gray-600 text-sm">{roomData.description || 'Available'}</p>
        </div>
      </div>
      <div className="relative flex-1 overflow-y-auto border p-2">
        {loading && <LoadingSpinner message="Loading chat..." />}
        {messages?.map((msg, index) => {
          const isUserMessage = msg.from === username;
          return (
            <div
              key={index}
              className={`flex justify-${isUserMessage ? 'end' : 'start'} my-1`}
            >
              <div
                className={`p-2 rounded max-w-xs
                  ${isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                `}
              >
                <MessageBubble text={msg.message} isUserMessage={isUserMessage} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white rounded p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const MessageBubble = ({ text, isUserMessage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const lines = text.split('\n').filter(Boolean).map((line, index) => (
    <div key={index} className={`whitespace-pre-wrap ${!isExpanded && index >= MAX_LINES ? 'line-clamp-3' : ''}`}>
      {line}
    </div>
  ));

  return (
    <div>
      {lines}
      {lines.length > MAX_LINES && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`text-blue-300 ${isUserMessage ? 'self-end' : 'self-start'}`}
        >
          Read more
        </button>
      )}
    </div>
  );
};

export default ChatWindow;
