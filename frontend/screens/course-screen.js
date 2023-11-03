import { StyleSheet, SafeAreaView } from "react-native";
import EventList from "../components/events/event-list";
export const CourseScreen = () => {
  return (
    <SafeAreaView>
      <EventList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});
