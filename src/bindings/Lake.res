module DOM = Webapi.Dom
module Document = Webapi.Dom.Document

type t

type emulator

@module("lake")
external init: unit => Js.Promise.t<t> = "default"

@module("lake")
external make: (@ignore t, unit) => emulator = "start_emulator"

@send
external free: emulator => unit = "free"

@send
external load: (emulator, Js.TypedArray2.Uint8Array.t) => unit = "load"

@send
external emulateCycle: emulator => unit = "emulate_cycle"

@send
external pressButton: (emulator, string) => unit = "press_button"

@send
external releaseButton: (emulator, string) => unit = "release_button"

@get
external screen: emulator => Js.TypedArray2.Uint8Array.t = "screen"

let listenKeyDown = emulator => Document.addKeyDownEventListener(evt => {
    let key = DOM.KeyboardEvent.key(evt)

    pressButton(emulator, key)
  }, DOM.document)

let listenKeyUp = emulator => Document.addKeyUpEventListener(evt => {
    let key = DOM.KeyboardEvent.key(evt)

    releaseButton(emulator, key)
  }, DOM.document)
