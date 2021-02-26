module DOM = Webapi.Dom
module Document = Webapi.Dom.Document

@react.component
let make = () => {
  let (engine, setEngine) = React.useState(_ => None)
  let (_, setTick) = React.useState(_ => 0)

  let forceUpdate = () => {
    setTick(i => i + 1)
  }

  React.useEffect0(() => {
    Lake.init()
    ->Promise.then(init => {
      let emulator = Lake.make(init, ())
      setEngine(_ => Some(emulator))

      Lake.listenKeyDown(emulator)
      Lake.listenKeyUp(emulator)

      Promise.resolve()
    })
    ->ignore

    Some(
      () => {
        switch engine {
        | Some(em) => Lake.free(em)
        | None => ()
        }
      },
    )
  })

  switch engine {
  | Some(emulator) =>
    <div>
      <Display display=Lake.screen(emulator) />
      <input
        onChange={e => {
          ReactEvent.Form.target(e)["files"][0]
          ->Webapi.File.arrayBuffer
          ->Promise.then(buffer => {
            let file = Js.TypedArray2.Uint8Array.fromBuffer(buffer)
            Lake.load(emulator, file)

            let _ = Js.Global.setInterval(_ => {
              Lake.emulateCycle(emulator)
              forceUpdate()
            }, 2)

            Promise.resolve()
          })
          ->ignore

          ()
        }}
        type_="file"
      />
    </div>
  | None => <div> <h1> {React.string("Loading...")} </h1> </div>
  }
}
