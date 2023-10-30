import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const EventItem = ({ id, title, description }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Chat", {
          title,
          description,
        })
      }
    >
      <Text>{`${title}`}</Text>
      <Text>{`${description}`}</Text>
    </TouchableOpacity>
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
});

export default EventItem;
