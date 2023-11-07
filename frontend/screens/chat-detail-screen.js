// export default EventDetailScreen;

import React from "react";
import { View, Text, StyleSheet, Button, Linking, TextInput, KeyboardAvoidingView } from "react-native";

const ChatDetailScreen = ({ route, navigation }) => {
  const { title, description, wiki } = route.params;

  const openGoogleDocs = () => {
    Linking.openURL(wiki);
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
      <View style={styles.chatInput}>
        <TextInput
          style={styles.inputField}
          placeholder="Type a message"
        />
        <Button title="Send" />
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
    bottom:0,
    position:"absolute",
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
