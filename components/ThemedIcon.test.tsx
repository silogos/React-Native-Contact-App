import React from "react";

import { ThemedIcon } from "./ThemedIcon";
import { render } from "@testing-library/react-native";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

describe("ThemedIcon", () => {
  it("renders correctly", () => {
    const tree = render(<ThemedIcon name="accessibility" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with default colorName", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { root } = render(
      <ThemedIcon name="accessibility" colorName="background" />
    );
    expect(root.props.style[0].color).toEqual(Colors.dark.background);
  });
});
