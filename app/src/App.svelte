<script>
	import { onMount } from "svelte";
	import ChatList from "./components/ChatList.svelte";
	import ChatWindow from "./components/ChatWindow.svelte";
  
	let rooms = [
	  { id: 1, name: "Alice", messages: [] },
	  { id: 2, name: "Bob", messages: [] },
	];
	let chosenRoom = null;
  
	const chooseRoom = (room) => {
	  chosenRoom = room.detail;
	};
  
	const addMessage = (message) => {
	  if (chosenRoom) {
			chosenRoom.messages.push(message);
	  }
	};
  </script>
  
  <style>
	.app {
	  display: flex;
	  height: 100vh;
	}
	.chat-list-wrapper {
	  width: 30%;
	  border-right: 1px solid #ccc;
	  padding: 10px;
	}
	.chat-window {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  padding: 10px;
	}
  </style>
  
  <div class="app">
	<div class="chat-list-wrapper">
	  <ChatList {rooms} on:chooseRoom={chooseRoom} />
	</div>
	<div class="chat-window">
	  {#if chosenRoom}
		<ChatWindow {chosenRoom} on:addMessage={addMessage} />
	  {:else}
		<h2>Select a chat to start messaging</h2>
	  {/if}
	</div>
  </div>
  