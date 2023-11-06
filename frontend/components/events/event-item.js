import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text, Animated, View } from "react-native";

const EventItem = ({ id, title, description, wiki }) => {
  const navigation = useNavigation();
  return (

    <Animated.View style={[styles.card]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            title,
            description,
            wiki,
          })
        }
      >
        <Text style={styles.title}>{title}</Text> 
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    //borderWidth: 1,
    //borderColor: "#c5c5c5",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
  },
  title: { 
    color: '#000', 
    fontSize: 16, 
    marginTop: -5,
  },
  description: {
    color: 'gray',
    fontSize: 14,
  },
});

export default EventItem;
