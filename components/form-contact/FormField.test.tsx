import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import FormField from "./FormField";

describe("FormField", () => {
  it("renders correctly", () => {
    const elm = render(<FormField iconName="accessibility" />).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("change value", () => {
    const testID = "text-input";
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <FormField
        testID={testID}
        iconName="accessibility"
        onChangeText={onChangeText}
      />
    );

    const input = getByTestId(testID);

    fireEvent.changeText(input, "Cobain ubah");
    expect(onChangeText).toHaveBeenCalledWith("Cobain ubah");
  });
});
