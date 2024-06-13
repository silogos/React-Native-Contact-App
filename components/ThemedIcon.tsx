import { useThemeColor } from "@/hooks/useThemeColor";
import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

type IconProps = ComponentProps<typeof Ionicons>;

export type ThemedIconProps = IconProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: Parameters<typeof useThemeColor>["1"];
};

export function ThemedIcon({
  lightColor,
  darkColor,
  colorName = "text",
  color,
  ...rest
}: ThemedIconProps) {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName
  );

  return <Ionicons color={color || themeColor} {...rest} />;
}
