import { Text, StyleSheet, SafeAreaView, Image, View } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const ProfilesScreen = () => {
  const { userInfo } = useContext(AuthContext);
  //const [showPassword, setShowPassWord] = useState(false);
  // const handleClickIcon = () => {
  //   curr = !showPassword;
  //   setShowPassWord(curr);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logos/gt_logo.png")}
      ></Image>
      <View style={{ align: "left" }}>
        <Text style={styles.text}>{`UserName: ${userInfo.firstName}`}</Text>
        <Text style={styles.text}>
          {`Email Address: ${userInfo.username}`}{" "}
        </Text>
        {/* {!showPassword ? (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.text}>{`Password: ${"*".repeat(
              userInfo.password.length
            )}`}</Text>
            <Ionicons
              style={styles.icon}
              name="eye-outline"
              onPress={handleClickIcon}
            ></Ionicons>
          </View>
        ) : (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.text}>{`Password:${userInfo.password}`}</Text>
            <Ionicons
              style={styles.icon}
              name="eye-off-outline"
              onPress={handleClickIcon}
            ></Ionicons>
          </View>
        )} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    marginRight: 10,
  },
  logo: {
    width: 150,
    height: 120,
    marginTop: 20,
    marginBottom: 30,
  },
  icon: {
    fontSize: 20,
  },
});
