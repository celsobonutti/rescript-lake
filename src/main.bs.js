

import * as React from "react";
import * as ReactDom from "react-dom";
import * as App$RescriptLake from "./App.bs.js";

var root = document.querySelector("#root");

if (root == null) {
  console.log("Something went wrong, root element not found.");
} else {
  ReactDom.render(React.createElement(App$RescriptLake.make, {}), root);
}

export {
  
}
/* root Not a pure module */
