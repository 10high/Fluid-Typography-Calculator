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
    await user.type(allInputFields[2], "020");
    await user.type(allInputFields[3], "0203456");
    const updatedAllInputFields = await screen.findAllByRole("textbox");

    //assert
    //tests that leading zeroes are removed
    expect(updatedAllInputFields[2]).toHaveValue("20");
    //tests that input length does not exceed 4 digits
    expect(updatedAllInputFields[3]).toHaveValue("2034");
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
    await user.click(allInputFields[2]);
    //clicks keypad digits
    await user.click(allKeypadKeys[0]);
    await user.click(allKeypadKeys[1]);
    await user.click(allKeypadKeys[2]);
    await user.click(allKeypadKeys[3]);
    await user.click(allKeypadKeys[4]);

    //assert
    expect(allInputFields[2]).toHaveValue("1234");
  });

  it("tests that 1) a digit added from the keypad is entered at the correct position 2)replaces any digits selected in input field 3) the caret position is correct after re-render, 4) focus is returned to last input", async () => {
    //arrange
    render(<App />);
    const allInputFields = screen.getAllByRole("textbox");
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const user = userEvent.setup();

    //act
    //sets focus on input field
    await user.click(allInputFields[2]);
    //clicks keypad digits
    await user.click(allKeypadKeys[0]);
    await user.click(allKeypadKeys[1]);
    await user.click(allKeypadKeys[2]);
    await user.click(allKeypadKeys[3]);
    await user.click(allKeypadKeys[4]);
    //selects middle two digits from inputfield
    allInputFields[2].setSelectionRange(1, 3);
    fireEvent.select(allInputFields[2]);
    //inserts digit "5"
    await user.click(allKeypadKeys[5]);

    //assert
    expect(allInputFields[2]).toHaveValue("154");
    expect(allInputFields[2].selectionEnd).toBe(2);
    expect(allInputFields[2]).toHaveFocus();
  });

  it("Keypad loses focus when user clicks away from input field and any digit from keypad or keyboard is not added to last focused input", async () => {
    //arrange
    render(<App />);
    const allInputFields = screen.getAllByRole("textbox");
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const allTooltips = screen.getAllByRole("tooltip");
    const user = userEvent.setup();

    //act
    await user.click(allInputFields[1]);
    await user.click(allTooltips[0]);
    // a 300 setTimeout that clears input ID on blur necessitates a timeout here
    setTimeout(() => {
      user.click(allKeypadKeys[5]);
      user.keyboard("6");

      //assert
      // allInputFields[0] has a default value of 16
      expect(allInputFields[1]).toHaveValue("16");
    }, 400);
  });

  it("test: keypad C button 1) clears all input 2)resets '1 rem' to '16' 3)returns focus to previous input", async () => {
    //arrange
    render(<App />);
    const allInputFields = screen.getAllByRole("textbox");
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const user = userEvent.setup();

    //act
    await user.click(allInputFields[1]);
    await user.click(allKeypadKeys[1]);
    await user.click(allInputFields[2]);
    await user.click(allKeypadKeys[2]);
    await user.click(allInputFields[3]);
    await user.click(allKeypadKeys[3]);
    await user.click(allInputFields[4]);
    await user.click(allKeypadKeys[4]);
    await user.click(allInputFields[5]);
    await user.click(allKeypadKeys[5]);
    //click keypad clear button
    await user.click(allKeypadKeys[11]);

    //assert
    //that input field have correct values
    expect(allInputFields[1]).toHaveValue("16");
    expect(allInputFields[2]).toHaveValue("0");
    expect(allInputFields[3]).toHaveValue("0");
    expect(allInputFields[4]).toHaveValue("0");
    expect(allInputFields[5]).toHaveValue("0");

    //that focus is returned last input field
    expect(allInputFields[5]).toHaveFocus();
  });

  it("tests that keypad 'delete' 1) removes all selected digits when multiple selected 2) that the caret is correctly positioned at end, 4) focus is returned to last input", async () => {
    //arrange
    render(<App />);
    const allInputFields = screen.getAllByRole("textbox");
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const user = userEvent.setup();

    //act
    //sets focus on input field
    await user.click(allInputFields[4]);
    //clicks keypad digits
    await user.click(allKeypadKeys[0]);
    await user.click(allKeypadKeys[1]);
    await user.click(allKeypadKeys[2]);
    await user.click(allKeypadKeys[3]);
    await user.click(allKeypadKeys[4]);
    //selects middle two digits from inputfield
    allInputFields[4].setSelectionRange(1, 3);
    //click delete
    await user.click(allKeypadKeys[10]);

    //assert
    expect(allInputFields[4]).toHaveValue("14");
    expect(allInputFields[4].selectionEnd).toBe(1);
    expect(allInputFields[4]).toHaveFocus();
  });

  it("tests that keypad 'delete' 1) removes 1 digit to the left when no digits selected 2) that the caret is correctly positioned at end, 3) focus is returned to last input", async () => {
    //arrange
    render(<App />);
    const allInputFields = screen.getAllByRole("textbox");
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const user = userEvent.setup();

    //act
    //sets focus on input field
    await user.click(allInputFields[4]);
    //clicks keypad digits
    await user.click(allKeypadKeys[0]);
    await user.click(allKeypadKeys[1]);
    await user.click(allKeypadKeys[2]);
    await user.click(allKeypadKeys[3]);
    await user.click(allKeypadKeys[4]);
    //sets caret position
    allInputFields[4].setSelectionRange(2, 2);
    //click delete
    await user.click(allKeypadKeys[10]);

    //assert
    expect(allInputFields[4]).toHaveValue("134");
    expect(allInputFields[4].selectionEnd).toBe(1);
    expect(allInputFields[4]).toHaveFocus();
  });
});

describe("tests ResultDisplay component", () => {
  it("tests that the result displayed is correct when equals button is clicked", async () => {
    //arrange
    render(<App />);
    const allKeypadKeys = screen.getAllByTestId("keypadButton");
    const allInputFields = screen.getAllByRole("textbox");
    const user = userEvent.setup();

    //act
    await user.type(allInputFields[2], "375");
    await user.type(allInputFields[3], "1440");
    await user.type(allInputFields[4], "16");
    await user.type(allInputFields[5], "24");
    await user.click(allKeypadKeys[12]);

    //assert
    expect(allInputFields[0]).toHaveValue(
      "clamp(1rem, 0.751vw + 0.824rem, 1.5rem)"
    );
  });
});
