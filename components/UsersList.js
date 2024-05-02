import User from "./User";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import socket from "../utils/socket";

export default function UsersList({ usersList }) {
  const ulist = usersList.filter((currUser) => currUser.id != socket.id);

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView style={{ gap: "20px" }}>
        {ulist.map((currUser, i) => (
          <User key={i} username={currUser.username} socketID={currUser.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
