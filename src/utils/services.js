import * as api from "../api/index.js";
import {
  addMessageToMessages,
  addRoomToRoomList,
  addUserToUserList,
} from "./builder.js";

export function refreshUserInfo() {
  const currentuser = JSON.parse(sessionStorage.getItem("currentuser"));
  const currentroom = JSON.parse(sessionStorage.getItem("currentroom"));

  const userInfo = document.querySelector(".user-info");
  userInfo.innerHTML = "";

  const userName = document.createElement("li");
  userName.textContent = `Mon nom : ${currentuser.username}`;
  userInfo.appendChild(userName);

  const roomName = document.createElement("li");
  roomName.textContent = `Mon salon : ${currentroom.name}`;
  userInfo.appendChild(roomName);
}

export async function refreshMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";
  sessionStorage.removeItem("messages");

  const roomId = JSON.parse(sessionStorage.getItem("currentroom")).id;
  const messages = await api.getMessagesByRoomId(roomId);

  sessionStorage.setItem("messages", JSON.stringify(messages.data));

  messages.data.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `
      <div class="message-header">
        <span class="message-username">${message.username}</span>
        <span class="message-timestamp">${formatTimestamp(
          message.timestamp
        )}</span>
      </div>
      <div class="message-content">
        ${message.content}
      </div>
    `;
    messagesDiv.appendChild(messageElement);
  });
}

export async function refreshRooms() {
  const rooms = await api.getRooms();
  sessionStorage.removeItem("rooms");
  const roomsData = rooms.map((room) => room.data);
  sessionStorage.setItem("rooms", JSON.stringify(roomsData));

  const roomList = document.querySelector(".room-list");
  roomList.innerHTML = "";

  rooms.forEach((room) => {
    const roomElement = document.createElement("li");
    roomElement.textContent = room.data.name;
    roomElement.addEventListener("click", () => {
      sessionStorage.setItem("currentroom", JSON.stringify(room.data));
      refreshUserInfo();
      refreshMessages();
    });
    roomList.appendChild(roomElement);
  });
}

export async function refreshUsers() {
  const users = await api.getUsers();
  sessionStorage.removeItem("users");
  const usersData = users.map((user) => user.data);
  sessionStorage.setItem("users", JSON.stringify(usersData));

  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const userElement = document.createElement("li");
    userElement.textContent = user.data.username;
    userList.appendChild(userElement);
  });
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
