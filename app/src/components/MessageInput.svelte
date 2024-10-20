<script>
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
    let messageText = "";
  
    const sendMessage = () => {
      if (messageText.trim()) {
        dispatch("addMessage", { text: messageText });
        messageText = "";
      }
    };
  </script>
  
  <style>
    .input-container {
      display: flex;
    }
    .input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .send-button {
      margin-left: 10px;
      padding: 10px;
    }
  </style>
  
  <div class="input-container">
    <input
      class="input"
      type="text"
      bind:value={messageText}
      placeholder="Type a message..."
      on:keypress={(e) => e.key === "Enter" && sendMessage()}
    />
    <button class="send-button" on:click={sendMessage}>Send</button>
  </div>
  