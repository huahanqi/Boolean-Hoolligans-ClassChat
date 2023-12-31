import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  // FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { CourseContext } from "../context/CourseContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { API_ENDPOINT } from "../config";

export const AddCourseScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { courses, addCourse } = useContext(CourseContext);
  const [showImage, setShowImage] = useState(true);

  const { userToken } = useContext(AuthContext);

  // Fetch allCourses from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/group`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setAllCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };
    fetchGroups();
  }, []); // The empty array ensures this effect runs once after the component mounts

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const formattedQuery = query.toLowerCase();
      const filtered = allCourses
        .filter((item) => item.name.toLowerCase().includes(formattedQuery))
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // no course will be shown
    }
  };

  const handleAddCourse = (course) => {
    addCourse(course);
    // console.log(courses);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text style={{ marginLeft: 10 }}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleAddCourse(item)}>
        <AntDesign
          name="pluscircle"
          size={24}
          color="green"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            style={{ marginTop: 10, flex: 1 }}
          />
        )}
      </View>
      {showImage && (
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <Image
            style={styles.logo}
            source={require("../assets/logos/mcdonalds_ad.jpg")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#ddd",
    backgroundColor: "white",
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
