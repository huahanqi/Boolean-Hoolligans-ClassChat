import { createStackNavigator } from "@react-navigation/stack";
import { ProfilesScreen } from "../screens/profile-screen";
import { CourseScreen } from "../screens/course-screen";
import { AddCourseScreen } from "../screens/add-course-screen";
import ChatDetailScreen from "../screens/chat-detail-screen";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();
export const CourseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="All Courses List"
        component={CourseScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <AntDesign
              name="plus"
              size={24}
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("AddCourse")} //  'AddCourse': name of the screen to add courses
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddCourse"
        component={AddCourseScreen}
        options={({ navigation }) => ({
          title: "Create New Course Chat",
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("All Courses List")}
            />
          ),
        })}
      />
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
