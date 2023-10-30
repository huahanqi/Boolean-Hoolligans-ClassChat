// export default EventDetailScreen;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatDetailScreen = ({ route, navigation }) => {
  const { title, description } = route.params;
  return (
    <View style={styles.container}>
      <Text>{`${title} message group`}</Text>
    </View>
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
});

export default ChatDetailScreen;
