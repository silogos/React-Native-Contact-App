import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import BottomAction from "./BottomAction";

describe("Detail", () => {
  it("renders correctly", () => {
    const elm = render(
      <BottomAction contactId={"123"} onDelete={() => {}} onShare={() => {}} />
    ).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("Render with title", () => {
    const onDelete = jest.fn();
    const onShare = jest.fn();
    const { getByTestId } = render(
      <BottomAction contactId={"123"} onDelete={onDelete} onShare={onShare} />
    );
    const editButton = getByTestId("edit-button");
    const deleteButton = getByTestId("delete-button");
    const shareButton = getByTestId("share-button");

    expect(editButton).toBeTruthy();

    fireEvent(deleteButton, "press");
    expect(onDelete).toHaveBeenCalledTimes(1);

    fireEvent(shareButton, "press");
    fireEvent(shareButton, "press");
    expect(onShare).toHaveBeenCalledTimes(2);
  });
});
