import React from "react";
import { render } from "@testing-library/react-native";

import { ThemedText } from "./ThemedText";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

describe("ThemedText", () => {
  it("renders correctly", () => {
    const elm = render(<ThemedText>Test</ThemedText>).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("renders correctly with default colorName", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { root } = render(<ThemedText colorName="background" />);
    expect(root.props.style[0].color).toEqual(Colors.dark.background);
  });
});
