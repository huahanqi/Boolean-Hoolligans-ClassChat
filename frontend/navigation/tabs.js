import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CourseStack, ProfileStack } from "./stack.js";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
        },
        tabBarActiveTintColor: "black",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Course") {
            iconName = focused ? "school" : "school-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={focused ? 35 : size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Course" component={CourseStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};
