import * as R from 'ramda'
import StateManager from '@common/game/state'
import Vector from '@common/game/math/Vector'
import { repeat } from '@common/game/utils/text'
import {
  State,
  StateFragments,
} from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import RenderLayer from '.'
import { drawCircleSolid, drawCircle } from '../drawing/circle'
import { drawText } from '../drawing/text'

export default class UnitsRenderLayer extends RenderLayer {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  render(
    discreetState: State<'Discreet'>,
    absoluteState: State<'Absolute'>,
    interfaceState: any,
    interfaceEvents: InterfaceEventEmitter,
  ) {
    this.context.fillStyle = 'rgba(255, 255, 255, 1.0)'
    this.context.strokeStyle = 'rgba(255, 255, 255, 1.0)'

    // Draw Unit Positions
    const unitsMap = R.path(['world', 'units'], absoluteState)
    const units = R.keys(unitsMap).map(
      key => unitsMap[key],
    ) as StateFragments<'Absolute'>['Unit'][]
    units.forEach(unit => {
      drawCircleSolid(this.context, unit.position, 1)
      const namePosition = Vector.add(unit.position, { x: 2, y: 0 })
      const levelPosition = Vector.add(unit.position, { x: 2, y: -2.4 })
      this.context.font = '24px Lato'
      drawText(this.context, unit.name, namePosition)
      this.context.font = '16px Lato'
      drawText(this.context, repeat('\u2605', unit.level), levelPosition)
    })

    const nearestUnit = StateManager.Utils.getNearestUnit(
      absoluteState,
      interfaceState.mouseWorldPosition,
    )
    if (
      nearestUnit &&
      Vector.distance(nearestUnit.position, interfaceState.mouseWorldPosition) <
        10
    ) {
      drawCircle(this.context, nearestUnit.position, 1.4)
    }
  }
}
