import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.brandContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>HABBY</Text>
          <Text style={styles.tagline}>Track. Complete. Grow.</Text>
        </View>
        <Text style={styles.welcomeText}>
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </Text>

        <TextInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />

        <Button mode="contained" style={styles.button}>
          {isSignUp ? "Sign Up" : "Login"}
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <Button mode="text" onPress={handleSwitchMode}>
            {isSignUp ? "Login" : "Sign Up"}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
});
