import { State } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import RenderLayer from '.'
import { InterfaceState } from '@frontend/game/types/InterfaceState'
import { drawTextInScreenSpace } from '../drawing/text'

export default class ModeRenderLayer extends RenderLayer {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  render(
    continuousState: State<'Continuous'>,
    absoluteState: State<'Absolute'>,
    interfaceState: InterfaceState,
    interfaceEvents: InterfaceEventEmitter,
  ) {
    this.context.fillStyle = 'rgba(255, 255, 255, 1.0)'
    this.context.strokeStyle = 'rgba(255, 255, 255, 1.0)'
    this.context.font = '32px Lato'

    drawTextInScreenSpace(this.context, interfaceState.mode, { x: 32, y: 64 })
  }
}
