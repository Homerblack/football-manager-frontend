import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

const [user, setUser] = useState(() => {

  const storedUser = localStorage.getItem("user");

  if (
    !storedUser ||
    storedUser === "undefined"
  ) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    return null;
  }
});

  const loginUser = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);