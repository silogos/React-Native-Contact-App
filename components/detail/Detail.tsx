import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

type DetailType = {
  label: String;
  value: String;
};

export default function Detail({ label, value }: DetailType) {
  const color = useThemeColor({}, "border");
  return (
    <ThemedView
      colorName="card"
      style={{ ...styles.container, borderBlockColor: color }}
    >
      <ThemedText type="defaultSemiBold" colorName="foreground">
        {label}:
      </ThemedText>
      <ThemedText type="defaultSemiBold" colorName="primary">
        {value}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
