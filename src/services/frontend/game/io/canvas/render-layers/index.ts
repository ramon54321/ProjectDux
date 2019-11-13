import { State } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'

export default abstract class RenderLayer {
  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
  }

  abstract render(
    discreetState: State<'Discreet'>,
    absoluteState: State<'Absolute'>,
    interfaceState: any,
    interfaceEvents: InterfaceEventEmitter,
  )
}
