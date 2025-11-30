import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const ICONS = [
  "check-circle-outline",
  "lightbulb",
  "book-open-page-variant",
  "heart-pulse",
  "food-apple",
  "water",
  "music",
  "account-group",
  "run",
  "spa",
];

type iconType = (typeof ICONS)[number];

const IconSelector = ({
  selectedIcon,
  setSelectedIcon,
}: {
  selectedIcon: iconType;
  setSelectedIcon: (icon: iconType) => void;
}) => {
  return (
    <View style={styles.iconGrid}>
      {ICONS.map((icon) => {
        const isSelected = selectedIcon === icon;
        return (
          <Pressable
            key={icon}
            onPress={() => setSelectedIcon(icon)}
            style={[styles.iconButton, isSelected && styles.iconButtonSelected]}
          >
            <MaterialCommunityIcons
              name={icon as any}
              size={28}
              color={isSelected ? "#FE7F2D" : "#8A6E63"}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  iconGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginVertical: 12,
  },
  iconButton: {
    width: 55,
    height: 55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#faf1ec",
  },
  iconButtonSelected: {
    borderColor: "#ffd9bc",
    borderWidth: 2,
  },
});

export default IconSelector;
