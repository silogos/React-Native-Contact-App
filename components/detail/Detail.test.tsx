import React from "react";
import { render } from "@testing-library/react-native";

import Detail from "./Detail";

describe("Detail", () => {
  it("renders correctly", () => {
    const elm = render(<Detail label={"title"} value={"value"} />).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("Render with data", () => {
    const label = "Test Title";
    const val = "Test Title";
    const { getByText } = render(<Detail label={label} value={val} />);

    expect(getByText(label)).toBeTruthy();
    expect(getByText(val)).toBeTruthy();
  });
});
