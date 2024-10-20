<script>
    export let message;
    const userId = 'user1'; // Replace with the actual user ID
  </script>
  
  <style>
    .message {
      max-width: 60%;
      padding: 10px;
      border-radius: 10px;
      margin: 5px 0;
    }
    .message-left {
      background-color: #f1f1f1; /* Color for incoming messages */
    }
    .message-right {
      background-color: #007bff; /* Color for outgoing messages */
      color: white;
    }
    .message-container {
      display: flex;
      justify-content: flex-start; /* Default to left */
      margin-bottom: 10px; /* Add some space between messages */
    }
    .message-container.right {
      justify-content: flex-end; /* Align right for outgoing messages */
    }
  </style>
  
  <div class={`message-container ${message.to === userId ? '' : 'right'}`}>
    <div class={`message ${message.to === userId ? 'message-left' : 'message-right'}`}>
      {message.message}
    </div>
  </div>
  