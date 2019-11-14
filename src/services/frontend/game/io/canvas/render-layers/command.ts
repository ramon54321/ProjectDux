import * as R from 'ramda'
import { State, StateFragments } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import RenderLayer from '.'
import { drawLine } from '../drawing/line'
import { InterfaceState } from '@frontend/game/types/InterfaceState'

export default class CommandRenderLayer extends RenderLayer {
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

    if (interfaceState.mode === 'MoveCommand') {
      const selectedUnit: StateFragments<'Absolute'>['Unit'] = R.path(
        ['world', 'units', interfaceState.selectedUnitId],
        absoluteState,
      )

      if (selectedUnit) {
        drawLine(this.context, selectedUnit.position, interfaceState.mouseWorldPosition)
      }
    }
  }
}
