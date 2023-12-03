import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
  View,
  FlatList,
} from "react-native";
import EventItem from "../components/events/event-item";
import { CourseContext } from "../context/CourseContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import { API_ENDPOINT } from "../../config";

export const CourseScreen = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { userToken } = useContext(AuthContext);

  const refreshPage = () => {
    setRefresh(true);
    fetchGroups();
    setRefresh(false);
  };

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

  useEffect(() => {
    fetchGroups();
  }, []); // The empty array ensures this effect runs once after the component mounts

  const VisibleItem = ({ data }) => {
    return (
      <View>
        <EventItem
          id={data.item._id}
          title={data.item.name}
          description={data.item.description}
          wiki={data.item.wiki}
        />
      </View>
    );
  };

  const renderItem = (data, rowMap) => <VisibleItem data={data} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => refreshPage()}
          />
        }
        data={allCourses}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: "flex-end",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: "#1f65ff",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  details: {
    fontSize: 12,
    color: "#999",
  },
});
