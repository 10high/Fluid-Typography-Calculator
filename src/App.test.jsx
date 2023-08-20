import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("tests that input from keyboard 1) removes leading zeroes and 2) that input length does not exceed 4 digits", async () => {
  //arrange
  render(<App />);
  const allInputFields = screen.getAllByRole("textbox");
  const user = userEvent.setup();

  //act
  await user.type(allInputFields[1], "020");
  await user.type(allInputFields[2], "0203456");
  const updatedAllInputFields = await screen.findAllByRole("textbox");

  //assert
  //tests that leading zeroes are removed
  expect(updatedAllInputFields[1]).toHaveValue("20");
  //tests that input length does not exceed 4 digits
  expect(updatedAllInputFields[2]).toHaveValue("2034");
});

it("tests that input from the keypad digits is 1) added to input fields 2)removes leading zeroes 3)restricts length to 4 digits", async () => {
  //arrange
  render(<App />);
  const allInputFields = screen.getAllByRole("textbox");
  const allKeypadKeys = screen.getAllByTestId("keypadButton");
  const user = userEvent.setup();

  //act
  //sets focus on input field
  await user.click(allInputFields[1]);
  //clicks keypad digits
  await user.click(allKeypadKeys[0]);
  await user.click(allKeypadKeys[1]);
  await user.click(allKeypadKeys[2]);
  await user.click(allKeypadKeys[3]);
  await user.click(allKeypadKeys[4]);

  //assert
  expect(allInputFields[1]).toHaveValue("1234");
});
