import * as React from "react";
import { render, screen } from "@testing-library/react";
import SignUpPage from "../pages/SignupPage";
import { describe, it, expect } from "vitest";

// TEST CASES
// 1. Test there are 2 input fields
// 2. Test there are 2 Buttons
// 3. Test onChange event for both input fields

// describe("SignUpPage", () => {
//   it("should render SignUpPage", () => {
//     render(<SignUpPage />);
//     screen.debug();
//     const headerElement = screen.getByRole("heading");
//     expect(headerElement).toBeInTheDocument();
//   });
// });

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
