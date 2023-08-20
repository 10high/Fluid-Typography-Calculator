import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("tests that input from keyboard removes leading zeroes", async () => {
  //arrange
  render(<App />);
  const allInputFields = screen.getAllByRole("textbox");
  const user = userEvent.setup();

  //act
  await user.type(allInputFields[1], "020");
  const updatedAllInputFields = await screen.findAllByRole("textbox");
  //assert
  expect(updatedAllInputFields[1]).toHaveValue("20");
});
