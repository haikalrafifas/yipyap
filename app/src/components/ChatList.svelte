<script>
  export let chats;
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  const handleChooseRoom = (room) => {
    dispatch("chooseRoom", room);
  };

  let rooms = [];
  let isRoomLoading = true;
  let isProfileLoading = true;
  let userProfile = {
    image: "path/to/profile/image.jpg", // Replace with actual image path
    name: "User Name",
    description: "User Description",
  };

  // Fetch chats from the API on component mount
  onMount(async () => {
    try {
      const [roomsResponse, userProfileResponse] = await Promise.all([
        fetch('http://localhost:3000/api/messages/user1'),
        fetch('http://localhost:3000/api/users/user1'),
      ]);

       // Handle rooms fetch
      if (roomsResponse.ok) {
        const json = await roomsResponse.json();
        rooms = json.data;
        rooms.map(room => room.messages = room.messages.reverse());
      } else {
        console.error('Failed to fetch chats:', roomsResponse.status);
      }

      // Handle user profile fetch
      if (userProfileResponse.ok) {
        const json = await userProfileResponse.json();
        userProfile = json.data;
      } else {
        console.error('Failed to fetch user data:', userProfileResponse.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Set loading states to false after fetch attempts
      isRoomLoading = false;
      isProfileLoading = false;
    }
  });

  const handleSettings = () => {
    // Handle settings action
  };

  const handleLogout = () => {
    // Handle logout action
  };

  import '../styles/ChatList.css';
</script>

<div class="chat-list-container">
  <div class="profile-bar">
    {#if isProfileLoading}
      <div class="spinner"></div>
    {:else}
      <img src={`/uploads/${userProfile.image}`} alt="Profile" class="profile-image" />
      <div class="profile-info">
        <p class="profile-name">{userProfile.name}</p>
        <p class="profile-description">{userProfile.description}</p>
      </div>
      <div class="action-icons">
        <span class="action-icon" on:click={handleSettings}>⚙️</span>
        <span class="action-icon" on:click={handleLogout}>🚪</span>
      </div>
    {/if}
  </div>

  <div class="chat-list">
    {#if isRoomLoading}
      <div class="spinner"></div>
    {:else}
      {#each rooms as room}
        <div class="chat-card" on:click={() => handleChooseRoom(room)}>
          <p class="chat-name">{room.name}</p>
          <p class="chat-description">{room.messages.slice(-1)[0]?.message}</p>
        </div>
      {/each}
    {/if}
  </div>
</div>
