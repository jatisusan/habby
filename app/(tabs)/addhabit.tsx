import IconSelector from "@/components/IconSelector";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];
const Addhabit = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");

  const [selectedIcon, setSelectedIcon] = useState("check-circle-outline");

  const handleSubmit = async () => {
    console.log({ name, description, frequency });
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Image
        source={require("../../assets/images/newhabit.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Let&apos;s Start a New Habit</Text>
      <TextInput
        label="Habit Name"
        mode="outlined"
        style={styles.input}
        onChangeText={setName}
        outlineColor="white"
        theme={{ roundness: 16 }}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
        outlineColor="white"
        theme={{ roundness: 16 }}
      />
      <View style={styles.segmentWrapper}>
        {FREQUENCIES.map((freq) => {
          const isSelected = frequency === freq;
          return (
            <Pressable
              key={freq}
              onPress={() => setFrequency(freq as Frequency)}
              style={[
                styles.segmentButton,
                isSelected && styles.segmentButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.segmentTextSelected,
                ]}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.iconInputWrapper}>
        <Text style={styles.label}>Choose Icon</Text>
        <IconSelector
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={{ fontSize: 16 }}
        disabled={!name || !description}
      >
        Add Habit
      </Button>
    </ScrollView>
  );
};

export default Addhabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#faf1ec",
  },
  image: {
    width: "100%",
    height: 130,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    height: 50,
  },
  button: {
    marginTop: 12,
    borderRadius: 16,
    height: 50,
    justifyContent: "center",
  },
  segmentWrapper: {
    flexDirection: "row",
    backgroundColor: "#FFE5D1",
    borderRadius: 20,
    padding: 6,
    gap: 6,
    marginVertical: 12,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentButtonSelected: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  segmentText: {
    fontSize: 15,
    color: "#8A6E63",
  },
  segmentTextSelected: {
    color: "#FE7F2D",
    fontWeight: "600",
  },
  iconInputWrapper: {
    marginVertical: 12,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    color: "#5c5454",
    marginLeft: 5,
  },
});
