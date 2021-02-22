module Canvas2d = Webapi.Canvas.Canvas2d

@react.component
let make = (~display) => {
  let canvasRef = React.useRef(Js.Nullable.null)

  let (canvas, setCanvas) = React.useState(_ => None)

  React.useEffect1(() => {
    setCanvas(_ => {
      canvasRef.current
      ->Js.Nullable.toOption
      ->Belt.Option.map(element => Webapi.Canvas.CanvasElement.getContext2d(element))
    })

    None
  }, [canvasRef])

  React.useEffect1(() => {
    switch canvas {
    | None => ()
    | Some(canvasContext) =>
      display->Js.TypedArray2.Uint8Array.forEachi((. elt, index) => {
        let y = (index / 64)->float_of_int
        let x = mod(index, 64)->float_of_int
        let color = if elt == 0 {
          "black"
        } else {
          "white"
        }
        canvasContext->Canvas2d.setFillStyle(String, color)
        canvasContext->Canvas2d.fillRect(~x=x *. 10., ~y=y *. 10., ~w=10., ~h=10.)
        canvasContext->Canvas2d.fill
      })
    }

    None
  }, [display])

  <canvas ref={ReactDOM.Ref.domRef(canvasRef)} width="640" height="320" />
}
