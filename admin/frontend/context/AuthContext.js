import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const login = () => {
    setUserInfo("res.data.user");
    setUserToken("res.data.token");
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        userToken,
        isLoading,
        userInfo,
        setIsLoading,
        setUserInfo,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
