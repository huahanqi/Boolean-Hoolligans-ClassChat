import React, { createContext, useState } from 'react';
import { Alert } from "react-native";


export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const addCourse = (newCourse) => {
    setCourses(prevCourses => {
        // Check if the course already exists based on id
        const courseExists = prevCourses.some(course => course.id === newCourse.id);
        if (!courseExists) {
          const updatedCourses = [...prevCourses, newCourse];
          updatedCourses.sort((a, b) => a.title.localeCompare(b.title));
          Alert.alert('Success', 'Course Chat Added! 🎉', [{ text: 'OK' }]);
          return updatedCourses;
        }
        Alert.alert('Sorry', 'Course Chat Added Before', [{ text: 'OK' }]);
        return prevCourses;
      });
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
