// export default EventDetailScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import axios from "axios";
import ChatMessages from "../components/chats/chat-messages";

const API_ENDPOINT = "http://localhost:4000/api";

const ChatDetailScreen = ({ route, navigation }) => {
  const { title, description, wiki } = route.params;

  const [message, setMessage] = useState("");
  const [totalMessage, setTotalMessage] = useState([]);
  useEffect(() => {}, [totalMessage]);

  const openGoogleDocs = () => {
    Linking.openURL(wiki);
  };

  const sendMessage = async () => {
    await axios
      .post(
        `${API_ENDPOINT}/message`,
        {
          message: message,
        },
        {
          params: {
            name: title,
          },
        }
      )
      .then((res) => {
        getAllMessages().then((res) => {
          console.log(res);
          setTotalMessage(res);
        });
        // console.log(totalMessage);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllMessages = async () => {
    return axios
      .get(`${API_ENDPOINT}/message`, {
        params: {
          name: title,
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.button}>
          <Button title="Wiki" onPress={openGoogleDocs} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ChatMessages messageData={totalMessage}></ChatMessages>
      <View style={styles.chatInput}>
        <TextInput
          style={styles.inputField}
          placeholder="Type a message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  message: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    width: "75%",
  },
  inputField: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
});

export default ChatDetailScreen;
