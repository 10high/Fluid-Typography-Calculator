import { it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Tooltip from "./Tooltip";
import userEvent from "@testing-library/user-event";

it("tooltip popup 1) displays on mouseover and 2) disappears again on mouseOff", async () => {
  //arrange
  render(<Tooltip>Test Content</Tooltip>);
  const tooltip = screen.getByRole("tooltip");
  const user = userEvent.setup();

  //act
  await user.hover(tooltip);
  const tooltipPopup = await screen.findByTestId("tooltipPopup");

  //assert
  expect(tooltipPopup).toHaveTextContent("Test Content");

  //act
  await user.unhover(tooltip);

  //assert
  expect(tooltipPopup).not.toBeInTheDocument();
});

it("tooltip popup 1) displays on keyboard focus and 2) disappears again on keyboard blur", async () => {
  //arrange
  render(<Tooltip>Test Content</Tooltip>);
  const tooltip = screen.getByRole("tooltip");

  //act
  fireEvent.focusIn(tooltip);
  const tooltipPopup = await screen.findByTestId("tooltipPopup");

  //assert
  expect(tooltipPopup).toHaveTextContent("Test Content");

  //act
  fireEvent.focusOut(tooltip);

  //assert
  expect(tooltipPopup).not.toBeInTheDocument();
});
