import { createStackNavigator } from "@react-navigation/stack";
import { ProfilesScreen } from "../screens/profile-screen";
import { CourseScreen } from "../screens/course-screen";
import ChatDetailScreen from "../screens/chat-detail-screen";

const Stack = createStackNavigator();
export const CourseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Your Courses" component={CourseScreen} />
      <Stack.Screen name="Chat" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profiles" component={ProfilesScreen} />
    </Stack.Navigator>
  );
};
