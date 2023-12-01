import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export const navOptions = () => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#0f172a",
    },
    headerRight: () => (
      <Ionicons name="add-outline" size={32} color="white"></Ionicons>
    ),
    headerLeft: () => (
      <Text style={{ color: "white", fontSize: 20, paddingLeft: 5 }}>
        {`Hello Buzz`}
      </Text>
    ),
  };
};
