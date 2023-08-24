import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyToClipbpard from "./CopyToClipboard";

it("tests 1) CopyToClipboard copies ResultDisplay to clipboard 2) displays copied notification for 1s", async () => {
  //Arange
  render(
    <CopyToClipbpard resultValue="clamp(2.625rem, 1.019vw + 2.396rem, 3.313rem)" />
  );
  const user = userEvent.setup();
  const clipboardIcon = screen.getByRole("button");

  //act
  await user.click(clipboardIcon);
  const clipboardContent = await navigator.clipboard.readText();
  const clipboardNotification = await screen.findByTestId(
    "clipboardNotification"
  );

  //assert
  expect(clipboardContent).toBe(
    "clamp(2.625rem, 1.019vw + 2.396rem, 3.313rem)"
  );
  expect(clipboardNotification).toBeInTheDocument();
  await waitFor(() => {
    expect(clipboardNotification).not.toBeInTheDocument();
  });
});
