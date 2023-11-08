import React, { useState } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";

const ChatMessages = ({ messageData }) => {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#ADD8E6",
          padding: 10,
          margin: 10,
          borderRadius: 10,
          minWidth: 30,
          maxWidth: "80%",
          borderRadius: 20,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Text>{item.message}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={messageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        refreshControl={<RefreshControl refreshing={false} />}
        style={{marginBottom: 55}}
      />
    </View>
  );
};

export default ChatMessages;
