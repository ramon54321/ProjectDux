import { State } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import { InterfaceState } from '@frontend/game/types/InterfaceState'

export default abstract class RenderLayer {
  context: CanvasRenderingContext2D

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
  }

  abstract render(
    continuousState: State<'Continuous'>,
    absoluteState: State<'Absolute'>,
    interfaceState: InterfaceState,
    interfaceEvents: InterfaceEventEmitter,
  )
}
