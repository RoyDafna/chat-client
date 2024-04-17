import { Avatar } from "@rneui/base";

export default function LetterAvatar({ username, color }) {
  return (
    <Avatar
      size={32}
      rounded
      title={username.length > 1 ? username.slice(0, 2) : ""}
      containerStyle={{ backgroundColor: color }}
    />
  );
}
