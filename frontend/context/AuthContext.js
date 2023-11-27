import React, { createContext, useState, useEffect } from "react";
import useAxios from 'axios-hooks';

const defaultUser = {
  casUser: 'Not authenticated',
  admin: false,
  firstName: null,
  lastName: null,
};

export const AuthContext = createContext(defaultUser);

export const AuthProvider = ({ children }) => {
  // const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);

  const [{ data }, fetchUser] = useAxios(
    {
      url: '/cas/user',
    },
    { manual: true }
  );

  async function onLoad() {
    try {
      await fetchUser();
    } catch (e) {}

    setIsLoading(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  // const login = () => {
  //   setUserInfo("res.data.user");
  //   setUserToken("res.data.token");
  // };
  return (
    <>
    {!isLoading && (
      <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
    )}
  </>
  );
};
