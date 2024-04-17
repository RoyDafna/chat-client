import { ScrollView, View } from "react-native";
import { Text } from "@rneui/base";
import LetterAvatar from "../components/LetterAvatar";
import { useEffect } from "react";
import socket from "../utils/socket";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "@rneui/base";
import { useState } from "react";
import Message from "../components/Message";
import User from "../components/User";

export default function ChatScreen({ route }) {
  const { username } = route.params;
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prevMessages) => [...prevMessages, message]);
    });

    socket.on("userConnected", (userConnected) => {
      console.log(JSON.stringify(userConnected));
      setUsersList(userConnected);
    });

    socket.emit("userConnected", { id: socket.id, username });

    return () => {
      socket.emit("userDisconnected", socket.id);
    };
  }, [socket]);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <SafeAreaView style={{ flex: 1, width: "80%" }}>
        <ScrollView style={{ height: "80%", gap: "20px" }}>
          {messagesList.map((currMessage, i) => (
            <Message key={i} message={currMessage} />
          ))}
        </ScrollView>
        <View style={{ height: "20%" }}>
          <Input value={message} onChangeText={setMessage} />
          <Button
            title="Send"
            onPress={() => {
              socket.emit("message", {
                message,
                id: socket.id,
                username,
              });
              setMessage("");
            }}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1, width: "20%" }}>
        <ScrollView style={{ height: "80%", gap: "20px" }}>
          {usersList.map((currUser, i) => (
            <User key={i} username={currUser.username} socketID={currUser.id} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </div>
  );
}
