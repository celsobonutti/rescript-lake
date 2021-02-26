module DOM = Webapi.Dom
module Document = Webapi.Dom.Document

Document.addEventListener("beep", _ => {
  let audioContext = Audio.Context.make()
  let oscillator = Audio.Context.createOscillator(audioContext)
  Audio.Oscillator.connect(oscillator, Audio.Context.destination(audioContext))
  Audio.Oscillator.start(oscillator)

  Js.Global.setTimeout(() => {
    Audio.Oscillator.stop(oscillator)
  }, 200)->ignore
}, DOM.document)

switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App />, root)
| None => Js.log("Something went wrong, root element not found.")
}
