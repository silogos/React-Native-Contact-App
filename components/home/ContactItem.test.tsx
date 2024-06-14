import React from "react";
import { render, waitFor } from "@testing-library/react-native";

import { ContactItem } from "./ContactItem";
import { Contact } from "@/types";

describe("Nav", () => {
  it("renders correctly", () => {
    const contact: Contact = {
      id: "",
      firstName: "D",
      lastName: "D",
      photo: "asdasdas",
    };
    const elm = render(<ContactItem contact={contact} />).toJSON();

    expect(elm).toMatchSnapshot();
  });

  it("Render with photo undefined", async () => {
    const contact: Contact = {
      id: "",
      firstName: "D",
      lastName: "D",
      photo: undefined,
    };
    const { firstName, lastName } = contact;
    const { getByText } = render(<ContactItem contact={contact} />);
    const titleElement = getByText(
      `${firstName[0].toUpperCase()} ${lastName[0].toUpperCase()}`
    );

    expect(titleElement).toBeTruthy();
  });

  it("Render with photo defined", async () => {
    const contact: Contact = {
      id: "",
      firstName: "D",
      lastName: "D",
      photo: "asdasdas",
    };

    const { getByTestId } = render(<ContactItem contact={contact} />);

    expect(getByTestId("contact-photo")).toBeTruthy();
  });
});
