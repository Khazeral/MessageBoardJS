import * as api from "../api/index.js";

export const addRoomToRoomList = (room) => {
  const roomList = document.querySelector(".room-list");
  const roomItem = document.createElement("li");
  roomItem.textContent = room.name;
  roomList.appendChild(roomItem);
};

export const addUserToUserList = (user) => {
  const userList = document.querySelector(".user-list");
  const userItem = document.createElement("li");
  userItem.innerHTML = user.username;
  userList.appendChild(userItem);
};

export const addMessageToMessages = async (message) => {
  const messagesDiv = document.getElementById("messages");
  const messageItem = document.createElement("div");
  const authorObj = await api.getUserById(message.user_id);
  const authorName = authorObj.data.username;
  messageItem.innerHTML = `
    <div class="message">
      <div class="message_author">${authorName}</div>
      <div class="message_content">${message.content}</div>
      <div class="message_date">${message.timestamp}</div>
    </div>
  `;
  messagesDiv.appendChild(messageItem);
};
