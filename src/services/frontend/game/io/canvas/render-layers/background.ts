import { WIDTH, HEIGHT } from '..'
import { State } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import { drawGrid } from '../drawing/grid'
import RenderLayer from '.'
import { InterfaceState } from '@frontend/game/types/InterfaceState'

export default class BackgroundRenderLayer extends RenderLayer {
  gradient: CanvasGradient

  constructor(context: CanvasRenderingContext2D) {
    super(context)
    this.gradient = context.createRadialGradient(
      WIDTH / 2,
      HEIGHT / 2,
      0,
      WIDTH / 2,
      HEIGHT / 2,
      1000,
    )
    this.gradient.addColorStop(0, 'rgba(20, 90, 160, 0.85)')
    this.gradient.addColorStop(1, 'rgba(20, 90, 160, 1.0)')
  }

  render(
    continuousState: State<'Continuous'>,
    absoluteState: State<'Absolute'>,
    interfaceState: InterfaceState,
    interfaceEvents: InterfaceEventEmitter,
  ) {
    this.context.fillStyle = this.gradient
    this.context.fillRect(0, 0, WIDTH, HEIGHT)
    drawGrid(this.context, 0, 0, 160, 120)
  }
}
