import { useNavigation } from "@react-navigation/native";
import LoginPage from "../screens/login-page";
import SignUpPage from "../screens/sign-up-page";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{ title: "GT Class Chat" }}
      />
      <Stack.Screen
        name="sign_up"
        component={SignUpPage}
        options={{ title: "GT Class Chat Sign Up" }}
      />
    </Stack.Navigator>
  );
};
