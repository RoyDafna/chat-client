import LetterAvatar from "./LetterAvatar";
import { Text, color } from "@rneui/base";
import { ListItem } from "@rneui/base";
import socket from "../utils/socket";

export default function Message({ message }) {
  const isMyMessage = message.id == socket.id;

  return (
    <div style={{ direction: isMyMessage ? "ltr" : "rtl" }}>
      <LetterAvatar
        username={message.username}
        color={isMyMessage ? "green" : "purple"}
      />

      <div
        style={{
          display: "flex",
          border: "solid",
          borderWidth: "1px",
          backgroundColor: isMyMessage ? "#94ffb0" : "#c9c9c9",
          width: "100%",
          borderRadius: "10px",
          maxWidth: "80%",
          gap: "10px",
        }}
      >
        <Text
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          {message.username}
        </Text>
        <br />
        <Text style={{ fontSize: "22px",  }}> {message.message} </Text>
      </div>
    </div>
  );
}
