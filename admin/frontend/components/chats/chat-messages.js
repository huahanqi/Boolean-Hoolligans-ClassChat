import React, { useState } from "react";
import { Text, View, FlatList, RefreshControl, TouchableOpacity } from "react-native";

const ChatMessages = ({ messageData, onDeleteMessage }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onLongPress={() => onDeleteMessage(item)}
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
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={messageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={false} />}
        style={{marginBottom: 55}}
      />
    </View>
  );
};

export default ChatMessages;
