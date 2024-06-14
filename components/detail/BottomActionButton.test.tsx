import React from "react";
import { render } from "@testing-library/react-native";

import BottomActionButton from "./BottomActionButton";

describe("Detail", () => {
  it("renders correctly", () => {
    const elm = render(
      <BottomActionButton iconName="accessibility" title={"Delete"} />
    ).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("Render with title", () => {
    const title = "Delete";
    const { getByText } = render(
      <BottomActionButton iconName="accessibility" title={title} />
    );

    expect(getByText(title)).toBeTruthy();
  });
});
