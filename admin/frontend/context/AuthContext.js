import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { API_ENDPOINT } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${API_ENDPOINT}/user/adminLogin`, {
        username: email.toLowerCase(),
        password,
      })
      .then((res) => {
        setUserInfo(res.data.user);
        setUserToken(res.data.token);
      })
      .catch((e) => {
        Alert.alert("Login failed", `Invalid user information`, [
          { text: "Try again" },
        ]);
      });
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && (
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
      )}
    </>
  );
};
