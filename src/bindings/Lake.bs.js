


function listenKeyDown(emulator) {
  document.addEventListener("keydown", (function (evt) {
          var key = evt.key;
          emulator.press_button(key);
          
        }));
  
}

function listenKeyUp(emulator) {
  document.addEventListener("keyup", (function (evt) {
          var key = evt.key;
          emulator.release_button(key);
          
        }));
  
}

var DOM;

var $$Document;

export {
  DOM ,
  $$Document ,
  listenKeyDown ,
  listenKeyUp ,
  
}
/* No side effect */
