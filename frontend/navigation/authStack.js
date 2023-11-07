import { useNavigation } from "@react-navigation/native";
import SignInPage from "../screens/sign-in-page";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sign_in"
        component={SignInPage}
        options={{ title: "GT Class Chat" }}
      />
    </Stack.Navigator>
  );
};
