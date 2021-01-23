import React, { useState, useMemo, useEffect } from "react";
import { getElementByXPath, getXPathForElement } from "../../utils/dom";
import PlaygroundComponent from "../../playground/component";
function Selector() {
  const [isActive, setActive] = useState(false);
  const [hoverElement, setHover] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  useEffect(() => {
    if (isActive) {
      if (selectedElement) {
        getElementByXPath(selectedElement).style.background = "";
        localStorage.removeItem("selectedElement");
        setSelectedElement(null);
      }
    }
  }, [isActive, selectedElement]);

  const eventHandlers = useMemo(
    () => ({
      onMouseOver({ target }) {
        if (isActive) {
          const XPathForSelectedElement = getXPathForElement(target);
          setHover(XPathForSelectedElement);
          target.style.background = "red";
        }
      },
      onMouseOut() {
        if (isActive) {
          setHover(null);
          getElementByXPath(hoverElement).style.background = "";
        }
      },
      onClick({ target }) {
        if (isActive) {
          const XPathForSelectedElement = getXPathForElement(target);
          setSelectedElement(XPathForSelectedElement);
          target.style.background = "red";
          localStorage.setItem("selectedElement", XPathForSelectedElement);
          setActive(false);
        }
      },
    }),
    [isActive, hoverElement]
  );
  return (
    <div>
      <div className="page-actions">
        <button onClick={() => setActive(!isActive)}>Select</button>{" "}
        {isActive.toString()}
      </div>
      <div className="playground">
        <PlaygroundComponent {...eventHandlers} />
      </div>
    </div>
  );
}

export default Selector;
