<script>
  import Message from "./Message.svelte";
  import MessageInput from "./MessageInput.svelte";
  
  export let chosenRoom;
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();
  
  const handleAddMessage = (message) => {
    dispatch("addMessage", message);
  };
</script>

<style>
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
</style>

<h2>Chat with {chosenRoom.name}</h2>
<div class="messages">
  {#each chosenRoom.messages as message}
    <Message {message} />
  {/each}
</div>
<MessageInput on:addMessage={handleAddMessage} />
