import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Selector from "./index";
import { getXPathForElement } from "../../utils/dom";
describe("Selector", () => {
  let selectorComponent,
    selectFirstChildElement,
    selectButton,
    getLocalStorageElement;
  beforeEach(() => {
    selectorComponent = render(<Selector />);
    // we don't any information about element like id,class or type because of Playground is as a 3rd party component so let's get first child element.
    selectFirstChildElement = selectorComponent.container.querySelector(
      ".playground"
    ).firstChild;
    selectButton = screen.getByText("Select");
    getLocalStorageElement = getXPathForElement(selectFirstChildElement);
  });
  it("should not running event handlers when select button state is false", () => {
    fireEvent.mouseOver(selectFirstChildElement);
    expect(selectFirstChildElement).not.toHaveStyle(`background-color: red;`);
    fireEvent.mouseOut(selectFirstChildElement);
    expect(selectFirstChildElement).not.toHaveStyle(`background-color: red;`);
    fireEvent.click(selectFirstChildElement);
    expect(selectFirstChildElement).not.toHaveStyle(`background-color: red;`);
  });
  it("should running event handlers when select button state is active by clicking", () => {
    fireEvent.click(selectButton);
    fireEvent.mouseOver(selectFirstChildElement);
    expect(selectFirstChildElement).toHaveStyle(`background-color: red;`);
    fireEvent.mouseOut(selectFirstChildElement);
    expect(selectFirstChildElement).not.toHaveStyle(`background-color: red;`);
    fireEvent.click(selectFirstChildElement);
    expect(selectFirstChildElement).toHaveStyle(`background-color: red;`);
    expect(window.localStorage.getItem("selectedElement")).toEqual(
      getLocalStorageElement
    );
  });
  it("should style and localStorage had been removed when select button re-click", () => {
    fireEvent.click(selectButton);
    fireEvent.click(selectFirstChildElement);

    fireEvent.click(selectButton);
    expect(selectFirstChildElement).not.toHaveStyle(`background-color: red;`);
    expect(window.localStorage.getItem("selectedElement")).not.toEqual(
      getLocalStorageElement
    );
  });
});

