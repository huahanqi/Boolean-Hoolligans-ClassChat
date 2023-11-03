// export default EventDetailScreen;

import React from "react";
import { View, Text, StyleSheet, Button, Linking } from "react-native";

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
