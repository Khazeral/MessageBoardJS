import * as api from "./api/index.js";
import {
  isValidUsername,
  isValidRoomName,
  isValidMessageContent,
} from "./utils/utils.js";

import {
  refreshUserInfo,
  refreshMessages,
  refreshRooms,
  refreshUsers,
} from "./utils/services.js";

import {
  addMessageToMessages,
  addRoomToRoomList,
  addUserToUserList,
} from "./utils/builder.js";

const promptUsername = () => {
  const username = prompt("Entrez votre nom d'utilisateur:");
  if (isValidUsername(username)) {
    return username;
  } else {
    alert("Nom d'utilisateur invalide");
    window.location.reload();
  }
};

const promptRoomName = () => {
  const roomName = prompt("Entrez le nom du salon à créer:");
  if (isValidRoomName(roomName)) {
    return roomName;
  } else {
    alert("Nom de salon invalide");
    window.location.reload();
  }
};

const init = async () => {
  sessionStorage.clear();
  const username = promptUsername();
  const response = await api.createUser(username);

  if (response.success === true) {
    addUserToUserList(response.data);
    sessionStorage.setItem("currentuser", JSON.stringify(response.data));
  } else if (
    response.data === "Username already exist" &&
    response.success === false
  ) {
    const currentuser = await api.getUserByUsername(username);
    sessionStorage.setItem("currentuser", JSON.stringify(currentuser.data));
  }

  const roomName = promptRoomName();
  const roomResponse = await api.createRoom(roomName);

  if (roomResponse.success === true) {
    addRoomToRoomList(roomResponse.data);
    sessionStorage.setItem("currentroom", JSON.stringify(roomResponse.data));
  } else if (
    roomResponse.data === "A room with the same name already exists." &&
    roomResponse.success === false
  ) {
    const currentRoom = await api.getRoomByName(roomName);
    sessionStorage.setItem("currentroom", JSON.stringify(currentRoom.data));
    alert("Connexion au salon existant " + roomName + " ...");
  }

  await refreshUserInfo();
  await refreshUsers();
  await refreshRooms();
  await refreshMessages();

  const storedUser = JSON.parse(sessionStorage.getItem("currentuser"));
  const storedRoom = JSON.parse(sessionStorage.getItem("currentroom"));
  const userId = storedUser.id;
  const roomId = storedRoom.id;
  const sendButton = document.getElementById("send-button");
  const disconnect = document.getElementById("disconnect");
  const changeuser = document.getElementById("change-user");
  const messageInput = document.getElementById("message-input");

  sendButton.addEventListener("click", async () => {
    const content = messageInput.value;
    if (isValidMessageContent(content)) {
      const response = await api.postMessage(userId, roomId, content);
      console.log(response);
      if (response.success === true) {
        await refreshMessages();
      } else {
        alert(response.data);
      }
      messageInput.value = "";
    } else {
      console.error("Contenu de message invalide");
    }
  });

  disconnect.addEventListener("click", async () => {
    const response = await api.disconnect();
    if (response.success === true) {
      window.location.reload();
    }
  });

  changeuser.addEventListener("click", async () => {
    window.location.reload();
  });
};

init();
