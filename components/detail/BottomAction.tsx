import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import BottomActionButton from "./BottomActionButton";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

type BottomActionType = {
  contactId: String;
  onDelete: () => void;
  onShare: () => void;
};

export default function BottomAction({
  contactId,
  onDelete,
  onShare,
}: BottomActionType) {
  const color = useThemeColor({}, "border");

  return (
    <ThemedView
      colorName="card"
      style={{ ...styles.container, borderTopColor: color }}
    >
      <Link push href={`edit/${contactId}`} asChild>
        <BottomActionButton iconName="pencil-outline" title="Edit" />
      </Link>
      <BottomActionButton
        onPress={onDelete}
        iconName="trash-bin-outline"
        title="Delete"
      />
      <BottomActionButton
        onPress={onShare}
        iconName="share-outline"
        title="Share"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 64,
    elevation: 4,
    borderTopWidth: 1,
  },
});
