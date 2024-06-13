import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { ThemedIcon } from "@/components/ThemedIcon";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface FormFieldInterface extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
}

export default function FormField({ iconName, ...props }: FormFieldInterface) {
  const inputColor = useThemeColor({}, "input");
  const inputPlaceholder = useThemeColor({}, "inputPlaceholder");
  const borderColor = useThemeColor({}, "border");

  return (
    <ThemedView
      colorName="card"
      style={{ ...styles.container, borderColor: borderColor }}
    >
      {iconName ? (
        <ThemedIcon colorName="input" size={22} name={iconName} />
      ) : (
        <View style={styles.blankIcon} />
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={{
            ...styles.input,
            color: inputColor,
          }}
          placeholderTextColor={inputPlaceholder}
          {...props}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    gap: 12,
  },
  blankIcon: {
    width: 22,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
  },
});
