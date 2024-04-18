import { render, screen, fireEvent } from "@testing-library/react";
import SignUpPage from "../pages/SignupPage";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

const MockSignUpPage = () => {
  return (
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );
};

describe("SignUpPage", () => {
  it("should render 2 buttons", () => {
    render(<MockSignUpPage />);
    screen.debug();
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements.length).toBe(2);
  });

  it("should render 1 email input field (used AIRA semantics) - used getByRole", () => {
    render(<MockSignUpPage />);
    const emailElement = screen.getByRole("textbox");
    expect(emailElement).toBeInTheDocument();
  });

  it("should render 1 email input field (used AIRA semantics) - used getAllByRole", () => {
    render(<MockSignUpPage />);
    const emailElement = screen.getAllByRole("textbox");
    expect(emailElement.length).toBe(1);
  });

  it("should render 1 password input field (NO ARIA semantics, have to set 'role' attribute)", () => {
    render(<MockSignUpPage />);
    const passwordElement = screen.getAllByRole("password");
    expect(passwordElement.length).toBe(1);
  });

  it("should simulate change event on password input", () => {
    render(<MockSignUpPage />);
    const passwordElement = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(passwordElement, { target: { value: "1234567" } });
    expect(passwordElement.value).toEqual("1234567");
  });
});
