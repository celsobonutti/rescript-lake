module rec Context: {
  type t

  type destination

  @new
  external make: unit => t = "AudioContext"

  @get
  external destination: t => destination = "destination" 

  @send
  external createOscillator: t => Oscillator.t = "createOscillator"
} = Context

and Oscillator: {
  type t

  @send
  external connect: t => Context.destination => unit = "connect"

  @send
  external start: t => unit = "start"

  @send
  external stop: t => unit = "stop"
} = Oscillator
