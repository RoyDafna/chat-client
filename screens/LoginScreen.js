import { View } from "react-native";
import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import { useEffect, useState } from "react";
import LetterAvatar from "../components/LetterAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSetUser } from "../utils/UserContext";

export default function LoginScreen({ navigation }) {
  [username, setUsername] = useState("");

  const setUser = getSetUser();

  useEffect(() => {
    const getUsername = async () => {
      const value = await AsyncStorage.getItem("username");

      if (value != null) {
        setUser(value);
        navigation.navigate("Chat");
      }
    };
    getUsername();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 4,
      }}
    >
      <LetterAvatar username={username} color={"green"} />
      <Input
        value={username}
        placeholder="USERNAME"
        onChangeText={setUsername}
      />
      <Button
        title="Enter Chat"
        onPress={async () => {
          await AsyncStorage.setItem("username", username);
          setUser(value);
          navigation.navigate("Chat");
        }}
      />
    </View>
  );
}
