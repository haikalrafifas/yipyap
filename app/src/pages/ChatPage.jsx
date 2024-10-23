import { useState, useEffect } from 'react';
import ChatList from '../components/Chats/ChatList';
import ChatWindow from '../components/Chats/ChatWindow';
import ProfileBar from '../components/Chats/ProfileBar';
import LoadingSpinner from '../components/Overlays/LoadingSpinner';
import { useLocalData } from '../context/LocalDataContext';
import { decodeToken, getToken } from '../utils/token';
import { useIsMobile } from '../utils/viewport';

const ChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [chosenRoom, setChosenRoom] = useState(null);
  const isMobile = useIsMobile();

  const { setLocalData } = useLocalData();

  const chooseRoom = (roomId) => {
    setChosenRoom(roomId);
  };

  const addMessage = (message) => {
    if (chosenRoom) {
      setChosenRoom((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const token = getToken();
        const response = await fetch('/api/messages/latest', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          return window.location.reload();
        }

        const data = await response.json();
        return data?.data || [];
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      } finally {
        setLoading(false);
      }
    };
    
    const initializeLocalData = async () => {
      const latestMessages = await fetchData();
      const user = decodeToken();

      // Prepare the rooms data
      const rooms = latestMessages.map(room => {
        const roomId = room.username || room.groupname;
        const roomType = room.username === undefined
          ? 'group' : 'personal';

        return { ...room, id: roomId, type: roomType, messages: [] };
      });

      // Set local data
      setLocalData({
        user,
        rooms,
      });
    };

    initializeLocalData();
  }, []);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      {loading && <LoadingSpinner message="Loading app..." />}

      {/* Sidebar */}
      <div className={`md:w-1/3 border-r p-4 h-full ${(chosenRoom && isMobile) && 'hidden'}`}>
        <ProfileBar />
        <ChatList onChooseRoom={chooseRoom} />
      </div>

      {/* Chat Window */}
      <div className={`flex-1 p-4 ${isMobile && !chosenRoom ? 'hidden' : 'block'}`}>
        {chosenRoom ? (
          <ChatWindow chosenRoom={chosenRoom} onAddMessage={addMessage} onBack={() => setChosenRoom(null)} />
        ) : (
          <h2>Select a chat to start messaging</h2>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
