// https://stackoverflow.com/a/43688599
export const getXPathForElement = (element) => {
  const idx = (sib, name) =>
    sib
      ? idx(sib.previousElementSibling, name || sib.localName) +
        (sib.localName === name)
      : 1;
  const segs = (elm) =>
    !elm || elm.nodeType !== 1
      ? [""]
      : elm.id && document.getElementById(elm.id) === elm
      ? [`id("${elm.id}")`]
      : [
          ...segs(elm.parentNode),
          `${elm.localName.toLowerCase()}[${idx(elm)}]`,
        ];
  return segs(element).join("/");
};
export const getElementByXPath = (path) => {
  return new XPathEvaluator().evaluate(
    path,
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
};
