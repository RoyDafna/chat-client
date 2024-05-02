import { ScrollView, View } from "react-native";
import { useEffect } from "react";
import socket from "../utils/socket";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Tab, TabView } from "@rneui/base";
import { useState } from "react";
import MessageList from "../components/MessageList";
import UsersList from "../components/UsersList";
import { getUser } from "../utils/UserContext";
import { Text } from "react-native-web";

export default function ChatScreen() {
  const username = getUser();
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

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
    <SafeAreaView style={{ flex: 1 }}>
      <Tab
        value={tabIndex}
        onChange={(e) => setTabIndex(e)}
        indicatorStyle={{
          backgroundColor: "#D3D3D3",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Chat"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "wechat", type: "font-awesome", color: "white" }}
        />
        <Tab.Item
          title="Users"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "users", type: "font-awesome", color: "white" }}
        />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex} animationType="timing">
        <TabView.Item style={{ flex: 1, height: "100%" }}>
          <View style={{ height: "80%" }}>
            <MessageList messagesList={messagesList} />
          </View>
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
        </TabView.Item>
        <TabView.Item>
          <UsersList usersList={usersList} />
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
}
