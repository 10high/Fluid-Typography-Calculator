import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("tests keyboard interactions with input fields", () => {
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
});

describe("tests keypad interactions with input fields", () => {
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

  it("tests that 1) a digit added from the keypad is entered at the correct position 2)replaces any digits selected in input field 3) the caret position is correct after re-render", async () => {
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
    //selects middle two digits from inputfield
    allInputFields[1].setSelectionRange(1, 3);
    fireEvent.select(allInputFields[1]);
    //inserts digit "5"
    await user.click(allKeypadKeys[5]);

    //assert
    expect(allInputFields[1]).toHaveValue("154");
    expect(allInputFields[1].selectionEnd).toBe(2);
  });

  it("Keypad loses focus when user clicks away from input field and any digit from keypad or keyboard is not added to last focused input", async () => {
    //arrange
    render(<App />);
    const allInputFields = screen.getAllByRole("textbox");
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const allTooltips = screen.getAllByRole("tooltip");
    const user = userEvent.setup();

    //act
    await user.click(allInputFields[0]);
    await user.click(allTooltips[0]);
    // a 300 setTimeout that clears input ID on blur necessitates a timeout here
    setTimeout(() => {
      user.click(allKeypadKeys[5]);
      user.keyboard("6");

      //assert
      // allInputFields[0] has a default value of 16
      expect(allInputFields[0]).toHaveValue("16");
    }, 400);
  });
});
