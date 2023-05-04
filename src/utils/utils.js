export function isInputStringValid(inputString) {
  return typeof inputString === "string" && inputString.trim().length > 0;
}

export function isRoomNameValid(roomName) {
  return typeof roomName === "string" && roomName.trim().length > 0;
}

export function isMessageContentValid(content) {
  const trimmedContent = content.trim();
  return (
    typeof content === "string" &&
    trimmedContent.length >= 2 &&
    trimmedContent.length <= 2048
  );
}

export function formatTimestampToTimeString(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
