
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Highlight from "./index";
import Selector from '../selector/index'
import { getElementByXPath } from "../utils";
describe("Highlight", () => {
  let highlightButton
  beforeEach(() => {
    const selectorComponent = render(<Selector />);
    const selectFirstChildElement = selectorComponent.container.querySelector(".playground").firstChild;
    const selectButton = screen.getByText("Select");
    fireEvent.click(selectButton);
    fireEvent.click(selectFirstChildElement);
    
    render(<Highlight />);
  });
  it("should be centered and bg colored is red which selected element when clicked Highlight button",  () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    
    highlightButton = screen.getByText("Highlight");
    fireEvent.click(highlightButton);
    expect(scrollIntoViewMock).toBeCalledWith({behavior: "auto",block: "center",inline: "center" });
    expect(getElementByXPath(window.localStorage.getItem("selectedElement"))).toHaveStyle(`background-color: red;`);
  });
});
