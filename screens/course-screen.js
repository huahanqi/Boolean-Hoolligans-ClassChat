import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import EventItem from "../components/events/event-item"; // Make sure the path is correct
import { CourseContext } from "../context/CourseContext";

export const CourseScreen = () => {
  const { courses } = useContext(CourseContext);
  
  return (
    <SafeAreaView style={styles.screen}>
      {courses.map(course => (
        <EventItem 
          key={course.id.toString()} 
          id={course.id} 
          title={course.title} 
          description={course.description} 
          wiki={course.wiki} 
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
});
