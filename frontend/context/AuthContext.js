import React, { createContext, useState, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
import { Alert } from "react-native";
import { API_ENDPOINT } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${API_ENDPOINT}/user/login`, {
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

  const register = (email, password, username) => {
    setIsLoading(true);
    axios
      .post(`${API_ENDPOINT}/user/register`, {
        username: email.toLowerCase(),
        password,
        firstName: username,
        lastName: username,
        admin: false,
      })
      .then((res) => {
        Alert.alert("Success! \nNow back to login page 😄");
      })
      .catch((e) => {
        Alert.alert("Register Failed. Double check info entered");
      });
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && (
        <AuthContext.Provider
          value={{
            login,
            register,
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
