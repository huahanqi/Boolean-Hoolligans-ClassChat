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
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import ChatMessages from "../components/chats/chat-messages";
import { Entypo } from "@expo/vector-icons";


const API_ENDPOINT = "https://booleanhoolligans-8pravvog.b4a.run/api";

const ChatDetailScreen = ({ route, navigation }) => {
  const { title, description, wiki } = route.params;

  const [message, setMessage] = useState("");
  const [totalMessage, setTotalMessage] = useState([]);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0


  useEffect(() => {
    navigation.setOptions({
      title: title, // Set the title of the header dynamically
    });
  }, [title, navigation]);

  useEffect(() => {
    getAllMessages().then((initial) => {
      setTotalMessage(initial);
    });
  }, []);
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
          setTotalMessage(res);
        });
        setMessage("");
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset} style={styles.container}>
      <View style={styles.messagesContainer}>
        <ChatMessages messageData={totalMessage}></ChatMessages>
      </View>
      <View style={styles.inputContainer}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.chatInput}>
            <View style={styles.camAndMic}>
              <Entypo name="camera" size={27} color="gray" />
              <Entypo name="attachment" size={27} color="gray" />
            </View>

            <TextInput
              style={styles.inputField}
              placeholder="Type a message"
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Keep the padding top
    paddingBottom: 20, // Keep the padding bottom
    paddingLeft: 0, // Remove padding left
    paddingRight: 0, // Remove padding right
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
    width: "100%", // Adjusted from 110% to 100%
    // paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    backgroundColor: "white",
    zIndex: 1, // Add this to ensure it's layered on top if needed
  },
  inputField: {
    flex: 1,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    padding: 5,
    height: 40,
  },
  camAndMic: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginHorizontal: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    // This ensures the input area is positioned at the bottom
    justifyContent: 'flex-end',
  },
});

export default ChatDetailScreen;