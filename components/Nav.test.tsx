import React from "react";
import { render } from "@testing-library/react-native";

import NavBar from "./Nav";

describe("Nav", () => {
  it("renders correctly", () => {
    const elm = render(<NavBar />).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("Render with title", () => {
    const title = "Test Title";
    const { getByText } = render(<NavBar title={title} />);
    const titleElement = getByText(title);

    expect(titleElement).toBeTruthy();
  });
});
