import LetterAvatar from "./LetterAvatar";
import { Text } from "@rneui/base";
import socket from "../utils/socket";

export default function User({ username, socketID }) {
  const isMe = socket.id == socketID;
  return (
    <div style={{ borderStyle: "solid", borderWidth: "1px" }}>
      <LetterAvatar username={username} color={isMe ? "green" : "purple"} />

      <div
        style={{
          display: "flex",
          borderWidth: "1px",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          {username}
        </Text>
      </div>
    </div>
  );
}
