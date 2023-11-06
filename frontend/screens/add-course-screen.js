import React, { useState, useContext } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { DUMMY_DATA } from "../data/dummy";
import { CourseContext } from "../context/CourseContext";

export const AddCourseScreen = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(DUMMY_DATA);
  const { addCourse } = useContext(CourseContext);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
        const formattedQuery = query.toLowerCase();
        const filtered = DUMMY_DATA.filter((item) => item.title.toLowerCase().includes(formattedQuery));
        setFilteredData(filtered);
    } else {
        setFilteredData([]); // no course will be shown
    }
  };

  const handleAddCourse = (course) => {
    addCourse(course);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10  }}>
      <Text style={{ marginLeft: 10 }} >{item.title}</Text>
      <TouchableOpacity onPress={() => handleAddCourse(item)}>
        <AntDesign name="pluscircle" size={24} color="green" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
        <View style={styles.searchContainer}>
            <AntDesign name="search1" size={20} style={styles.searchIcon} />
            <TextInput
                placeholder="Search courses"
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchInput}
            />
        </View>
        {searchQuery.trim() && (
        <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={{ marginTop: 10 }} 
        />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: '#ddd',
      backgroundColor: 'white', 
    },
    searchInput: {
      flex: 1,
      paddingLeft: 10,
      fontSize: 18, // Make the text larger
    },
    searchIcon: {
      marginRight: 10,
    },
  });