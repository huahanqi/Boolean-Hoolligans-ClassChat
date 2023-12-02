import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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

const MainStack = createStackNavigator();


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
      <MainStack.Navigator>
        <MainStack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <MainStack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      </MainStack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
