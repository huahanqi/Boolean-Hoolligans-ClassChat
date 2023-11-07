import React, { useState } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import EventItem from "../events/event-item";

const ChatMessages = ({ messageData }) => {
  console.log(messageData);
  const renderItem = ({ item }) => {
    console.log(item.message);
    return (
      <View
        style={{
          alignSelf: "flex-end",
          backgroundColor: "#ADD8E6",
          padding: 10,
          margin: 10,
          borderRadius: 10,
          width: "70%",
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
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log("refreshing")}
          />
        }
      />
    </View>
  );
};

export default ChatMessages;
