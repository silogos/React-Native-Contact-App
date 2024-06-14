import React from "react";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { render } from "@testing-library/react-native";

describe("ThemedView", () => {
  it("renders correctly", () => {
    const elm = render(<ThemedView />).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("renders correctly with default colorName", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { root } = render(<ThemedView colorName="background" />);

    expect(root.props.style[0].backgroundColor).toEqual(Colors.dark.background);
  });
});
