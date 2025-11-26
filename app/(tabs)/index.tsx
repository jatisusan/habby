import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/login" style={styles.button}>
        Go to Login screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    color: "white",
  },
});
