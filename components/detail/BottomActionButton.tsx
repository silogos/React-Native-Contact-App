import React from "react";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";

interface BottomActionButtonType extends PressableProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: String;
}

const BottomActionButton = React.forwardRef<View, BottomActionButtonType>(
  ({ iconName, title, ...props }, ref) => {
    return (
      <Pressable {...props} style={styles.container} ref={ref}>
        <ThemedIcon size={20} name={iconName} />
        <ThemedText type="default" style={styles.title}>
          {title}
        </ThemedText>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: 10,
  },
});

export default BottomActionButton;
