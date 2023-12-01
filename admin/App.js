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
import { AuthProvider } from "./frontend/context/AuthContext";
import { CourseProvider } from './frontend/context/CourseContext';
import AppNav from "./frontend/navigation/appNav";

export default function App() {
  return (
    <CourseProvider>
      <AuthProvider>
        <AppNav />
        <StatusBar style="light" />
      </AuthProvider>
    </CourseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
