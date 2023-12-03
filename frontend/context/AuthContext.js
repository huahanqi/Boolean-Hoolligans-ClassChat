import React, { createContext, useState, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
export const AuthContext = createContext();

const API_ENDPOINT = "http://localhost:4000/api";
//const API_ENDPOINT = "https://booleanhoolligans-8pravvog.b4a.run/api";

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${API_ENDPOINT}/user/login`, {
        username: email,
        password,
      })
      .then((res) => {
        //setUserInfo(res.data.user);
        setUserToken(res.data.token);
      })
      .catch((e) => {
        console.log(e);
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
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
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
            //userInfo,
            setIsLoading,
            //setUserInfo,
            setUserToken,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
