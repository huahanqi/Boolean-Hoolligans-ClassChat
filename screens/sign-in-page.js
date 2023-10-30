import React, { useContext } from "react";
import { Text, StyleSheet, Button, SafeAreaView, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function SignInPage(props) {
  const { login } = useContext(AuthContext);
  const handleSignIn = () => {
    login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logos/login.png")}
      ></Image>
      <Text style={styles.heading}>Connect Easily with College Classmates</Text>

      <Text>Terms & Privacy Policy</Text>

      <Button title="Start Message" onPress={handleSignIn} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 100,
    marginTop: 30,
    width: 250,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  logo: {
    width: 350,
    height: 230,
    marginBottom: 50,
    marginTop: 50,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
