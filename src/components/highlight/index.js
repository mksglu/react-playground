import React, { useEffect, useState } from "react";
import PlaygroundComponent from "../../playground/component";
import { getElementByXPath } from "../../utils/dom";
import { usePrevious } from "../../hooks";
function Highlight() {
  const [selectedElement, setSelectedElement] = useState(null);
  const prevSelectedElement = usePrevious({
    selectedElement,
    setSelectedElement,
  });
  useEffect(() => {
    const getSelectedElement = localStorage.getItem("selectedElement") || null;
    setSelectedElement(getSelectedElement);
    window.addEventListener("storage", (e) => {
      const getNewValue = e && e.key === "selectedElement" && e.newValue ? e.newValue : null;
      if (getNewValue) {
        setSelectedElement(getNewValue);
      }
    });
    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);
  const handleClick = () => {
    if (selectedElement) {
      if (prevSelectedElement && prevSelectedElement.selectedElement) {
        getElementByXPath(prevSelectedElement.selectedElement).style.background = "";
      }
      getElementByXPath(selectedElement).style.background = "red";
      getElementByXPath(selectedElement).scrollIntoView({behavior: "auto",block: "center",inline: "center"});
    }
  };
  return (
    <div>
      <div className="page-actions">
        <button onClick={handleClick}>Highlight</button>
      </div><div className="playground">
      <PlaygroundComponent />
    </div>
    </div>
  );
}

export default Highlight;
