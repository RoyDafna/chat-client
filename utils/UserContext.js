import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);
const SetUserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}

export function getUser() {
  return useContext(UserContext);
}

export function getSetUser() {
  return useContext(SetUserContext);
}
