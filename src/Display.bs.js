

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Webapi__Canvas__Canvas2d from "bs-webapi/src/Webapi/Canvas/Webapi__Canvas__Canvas2d.bs.js";

function Display(Props) {
  var display = Props.display;
  var canvasRef = React.useRef(null);
  var match = React.useState(function () {
        
      });
  var setCanvas = match[1];
  var canvas = match[0];
  React.useEffect((function () {
          Curry._1(setCanvas, (function (param) {
                  return Belt_Option.map(Caml_option.nullable_to_opt(canvasRef.current), (function (element) {
                                return element.getContext("2d");
                              }));
                }));
          
        }), [canvasRef]);
  React.useEffect((function () {
          if (canvas !== undefined) {
            var canvasContext = Caml_option.valFromOption(canvas);
            display.forEach(function (elt, index) {
                  var y = index / 64 | 0;
                  var x = index % 64;
                  var color = elt === 0 ? "black" : "white";
                  Webapi__Canvas__Canvas2d.setFillStyle(canvasContext, /* String */0, color);
                  canvasContext.fillRect(x * 10, y * 10, 10, 10);
                  canvasContext.fill();
                  
                });
          }
          
        }), [display]);
  return React.createElement("canvas", {
              ref: canvasRef,
              height: "320",
              width: "640"
            });
}

var Canvas2d;

var make = Display;

export {
  Canvas2d ,
  make ,
  
}
/* react Not a pure module */
