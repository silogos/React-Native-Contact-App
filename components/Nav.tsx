import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ThemedText } from "./ThemedText";
import React, { ReactElement, ReactNode } from "react";
import { ThemedIcon } from "./ThemedIcon";

type NavButton = {
  iconName: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress: () => void;
};

type NavSide = NavButton | NavButton[] | React.Component;

interface NavBarType extends ViewProps {
  backButton?: Boolean;
  title?: String;
  leftSide?: NavSide;
  rightSide?: NavSide;
}

function NavSide({ items }: { items: NavSide }) {
  if (items instanceof React.Component) {
    return <>{items}</>;
  }

  if (Array.isArray(items)) {
    return items.map(({ onPress = () => {}, color = "#000", iconName }) => (
      <Pressable style={styles.navButton} onPress={onPress}>
        <ThemedIcon
          colorName="foreground"
          size={30}
          color={color}
          name={iconName}
        />
      </Pressable>
    ));
  }

  return (
    <Pressable style={styles.navButton} onPress={items.onPress}>
      <ThemedIcon
        colorName="foreground"
        size={30}
        color={items.color}
        name={items.iconName}
      />
    </Pressable>
  );
}

export default function NavBar({
  backButton = true,
  title,
  leftSide,
  rightSide,
  ...props
}: NavBarType) {
  return (
    <View id="nav" style={styles.nav} {...props}>
      <View style={styles.navSide}>
        {backButton && (
          <Link href={"../"} asChild>
            <Pressable style={styles.navButton}>
              <ThemedIcon
                colorName="foreground"
                size={30}
                name="chevron-back"
              />
            </Pressable>
          </Link>
        )}
        {leftSide && <NavSide items={leftSide} />}
      </View>

      <View style={styles.navSide}>
        {rightSide && <NavSide items={rightSide} />}
      </View>

      {title && (
        <View style={styles.title}>
          <ThemedText
            colorName="foreground"
            type="defaultSemiBold"
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {title}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "relative",
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  navSide: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  navButton: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  title: {
    zIndex: -1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
