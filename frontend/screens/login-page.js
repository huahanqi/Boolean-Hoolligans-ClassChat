import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { Alert } from "react-native";

export default function LoginPage(props) {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  const { login, userToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.trim() === "" && password.trim() === "") {
      Alert.alert("email and password required");
    } else if (email.trim() === "") {
      Alert.alert("email required");
    } else if (password.trim() === "") {
      Alert.alert("password required");
    } else {
      login(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/logos/login.png")}
        ></Image>
        <Text style={styles.heading}>
          Connect Easily with College Classmates
        </Text>

        <Text style={{ paddingBottom: 10 }}>Terms & Privacy Policy</Text>

        <View>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={styles.email}
          >
            <TextInput
              placeholder="Your GT Email"
              placeholderTextColor={"gray"}
              style={{ fontSize: 16 }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={styles.password}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              style={{ fontSize: 16 }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
          >
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text
                style={{ color: "white", alignSelf: "center", fontSize: 16 }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={{
              flexDirection: "row", // flex-row
              justifyContent: "center", // justify-center
            }}
          >
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("sign_up")}
            >
              <Text style={{ color: "#000080", fontWeight: "bold" }}>
                SignUp
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* <Button title="Start Messaging" onPress={handleSignIn} /> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    marginBottom: 40,
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
  email: {
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Light gray background
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 15, // Horizontal padding
    borderRadius: 10, // Rounded corners
    width: "100%", // Width of the TextInput
    height: 45, // Fixed height
    marginBottom: 10, // Margin at the bottom
    width: 300,
  },
  password: {
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Light gray background
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 10, // Rounded corners
    width: "100%", // Width of the TextInput
    height: 45, // Fixed height
    marginBottom: 10, // Margin at the bottom
    width: 300,
  },
  loginButton: {
    width: "100%", // w-full
    backgroundColor: "#000080",
    padding: 12, // p-3
    borderRadius: 15, // rounded-2xl
    marginBottom: 12, // mb-3
  },
});
