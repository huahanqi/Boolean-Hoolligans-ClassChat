import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

//const API_ENDPOINT = "http://localhost:4000/api";
const API_ENDPOINT = "https://booleanhoolligans-8pravvog.b4a.run/api";

export const AddCourseScreen = ({ navigation }) => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    wiki: "",
  });
  const { userToken } = useContext(AuthContext);
  const createCourse = async () => {
    await axios
      .post(`${API_ENDPOINT}/group`, {
        params: {
          name: group.name,
          description: group.description,
          wiki: group.wiki,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        Alert.alert("Success", `Course Chat for ${res.data.name} Created! 🎉`, [
          { text: "OK" },
        ]);
      })
      .catch((e) => {
        if (e.response.status == 400) {
          Alert.alert("Validation Failed", `This course chat already exists`, [
            { text: "OK" },
          ]);
        } else {
          console.log(e);
        }
      });
  };

  const onSubmit = () => {
    if (group.name == "" || group.wiki == "" || group.description == "") {
      Alert.alert("Submission Failed", `Information Entered not Valid`, [
        { text: "Try Again" },
      ]);
    } else {
      createCourse();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Chat</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter course title"
          value={group.name}
          onChangeText={(text) => setGroup({ ...group, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={group.description}
          onChangeText={(text) => setGroup({ ...group, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter wiki link"
          value={group.wiki}
          onChangeText={(text) => setGroup({ ...group, wiki: text })}
        />
        <Button
          style={styles.addButtonText}
          onPress={onSubmit}
          title={"Submit this course chat to list"}
        ></Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    marginTop: 40,
    marginBottom: 40,
    overflow: "scroll",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
  },
  itemList: {
    fontSize: 20,
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddCourseScreen;
