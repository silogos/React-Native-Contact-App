import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: Parameters<typeof useThemeColor>["1"];
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorName = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
