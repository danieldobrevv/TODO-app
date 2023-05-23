import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

it("should render todo heading", () => {
  render(<App />);
  const headdingElement = screen.getByText(/my todo/i);
  expect(headdingElement).toBeInTheDocument();
});

it("should render todo textbox", () => {
  render(<App />);
  const textboxElement = screen.getByPlaceholderText(/Write your task/i);
  expect(textboxElement).toBeInTheDocument();
});

it("should change value of textbox", () => {
  render(<App />);
  const textboxElement = screen.getByPlaceholderText(/Write your task/i);
  fireEvent.change(textboxElement, { target: { value: "walk the dog" } });
  expect(textboxElement.value).toBe("walk the dog");
});

it("should create todo element after pressing enter", () => {
  render(<App />);
  const textboxElement = screen.getByPlaceholderText(/Write your task/i);
  fireEvent.change(textboxElement, { target: { value: "walk the dog" } });
  const formElement = screen.getByTestId("form");
  fireEvent.submit(formElement);
  const taskElement = screen.getByText(/walk the dog/i);
  expect(taskElement).toBeInTheDocument();
});

it("should not create todo when textbox is empty", () => {
  render(<App />);
  const textboxElement = screen.getByPlaceholderText(/Write your task/i);
  fireEvent.change(textboxElement, { target: { value: "" } });
  const formElement = screen.getByTestId("form");
  fireEvent.submit(formElement);
  const taskElement = screen.queryByTestId("todo");
  expect(taskElement).not.toBeInTheDocument();
});

it("should delete all todo elements after clicking delete", () => {
  render(<App />);
  const textboxElement = screen.getByPlaceholderText(/Write your task/i);
  const formElement = screen.getByTestId("form");
  fireEvent.change(textboxElement, { target: { value: "walk the dog" } });
  fireEvent.submit(formElement);
  fireEvent.change(textboxElement, { target: { value: "walk the cat" } });
  fireEvent.submit(formElement);
  const taskElements = screen.queryAllByTestId("todo");
  expect(taskElements[0].textContent).toBe("walk the dog");
  expect(taskElements[1].textContent).toBe("walk the cat");
  const buttonElement = screen.getByText(/Delete all/i);
  fireEvent.click(buttonElement);
  const taskElements2 = screen.queryAllByTestId("todo");
  expect(taskElements2.length).toBe(0);
});
