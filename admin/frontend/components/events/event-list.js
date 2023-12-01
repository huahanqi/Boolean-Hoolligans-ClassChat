import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  Button,
} from "react-native";
import { DUMMY_DATA } from "../../data/dummy";
import EventItem from "./event-item";

const EventList = () => {
  const renderItem = ({ item }) => {
    return (
      <View>
        <EventItem
          id={item.id}
          title={item.title}
          description={item.description}
          wiki={item.wiki}
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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

export default EventList;
