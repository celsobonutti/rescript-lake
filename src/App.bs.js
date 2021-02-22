

import * as Lake from "lake";
import Lake$1 from "lake";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Lake$RescriptLake from "./bindings/Lake.bs.js";
import * as Display$RescriptLake from "./Display.bs.js";

function App(Props) {
  var match = React.useState(function () {
        
      });
  var setEngine = match[1];
  var engine = match[0];
  var match$1 = React.useState(function () {
        
      });
  var setDisplay = match$1[1];
  var display = match$1[0];
  React.useEffect((function () {
          Lake$1().then(function (init) {
                var emulator = Lake.start_emulator();
                Curry._1(setEngine, (function (param) {
                        return Caml_option.some(emulator);
                      }));
                Curry._1(setDisplay, (function (param) {
                        return Caml_option.some(emulator.screen);
                      }));
                Lake$RescriptLake.listenKeyDown(emulator);
                Lake$RescriptLake.listenKeyUp(emulator);
                return Promise.resolve(undefined);
              });
          return (function (param) {
                    if (engine !== undefined) {
                      Caml_option.valFromOption(engine).free();
                      return ;
                    }
                    
                  });
        }), []);
  if (engine === undefined) {
    return React.createElement("div", undefined, React.createElement("h1", undefined, "Loading..."));
  }
  var emulator = Caml_option.valFromOption(engine);
  return React.createElement("div", undefined, display !== undefined ? React.createElement(Display$RescriptLake.make, {
                    display: Caml_option.valFromOption(display)
                  }) : null, React.createElement("input", {
                  type: "file",
                  onChange: (function (e) {
                      Caml_array.get(e.target.files, 0).arrayBuffer().then(function (buffer) {
                            var file = new Uint8Array(buffer);
                            emulator.load(file);
                            setInterval((function (param) {
                                    emulator.emulate_cycle();
                                    return Curry._1(setDisplay, (function (param) {
                                                  return Caml_option.some(emulator.screen);
                                                }));
                                  }), 2);
                            return Promise.resolve(undefined);
                          });
                      
                    })
                }));
}

var DOM;

var $$Document;

var make = App;

export {
  DOM ,
  $$Document ,
  make ,
  
}
/* lake Not a pure module */
