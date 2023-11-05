import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, Animated, TouchableHighlight, TouchableOpacity, StatusBar, View } from "react-native";
import EventItem from "../components/events/event-item"; 
import { CourseContext } from "../context/CourseContext";
import { SwipeListView } from 'react-native-swipe-list-view';
import { AntDesign } from '@expo/vector-icons';

export const CourseScreen = () => {
  const { courses, deleteCourse } = useContext(CourseContext);

  const HiddenItemWithActions = props => {
    const { onDelete, data } = props;

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => onDelete(data.item.id)} // Call the onDelete with the item's id
        >
          <AntDesign name="delete" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }

  const renderHiddenItem = (data, rowMap) => {
    return (<HiddenItemWithActions
      data = {data}
      rowMap = {rowMap}
      onDelete={() => onDelete(data.item)}
    />);
  };

  const onDelete = (course) => {
    deleteCourse(course); 
  };
  
  const VisibleItem = ({ data }) => {
    return (
      <TouchableHighlight
        style={styles.rowFrontVisible}
      >
        <View> 
          <EventItem 
          id={data.item.id} 
          title={data.item.title} 
          description={data.item.description} 
          wiki={data.item.wiki} 
          />
        </View>
      </TouchableHighlight>
    );
  };

  const renderItem = (data, rowMap) => (
    <VisibleItem data={data}/>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={courses}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        leftOpenValue={75}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});