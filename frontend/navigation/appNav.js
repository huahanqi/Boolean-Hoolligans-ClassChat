import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { AuthStack } from "./authStack";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext } from "react";
import { HomeTabs } from "./tabs";

export default function AppNav() {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large"></ActivityIndicator>
      </SafeAreaView>
    );
  }
  return (
    <NavigationContainer>
      {/* {userToken !== null ? <HomeTabs /> : <AuthStack />} */}
      <AuthStack />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
