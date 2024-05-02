import Message from "./Message";
import { ScrollView } from "react-native-web";

export default function MessageList({ messagesList }) {
  return (
    <ScrollView style={{ gap: "20px" }}>
      {messagesList.map((currMessage, i) => (
        <Message key={i} message={currMessage} />
      ))}
    </ScrollView>
  );
}
