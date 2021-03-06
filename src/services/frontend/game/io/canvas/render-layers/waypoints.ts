import * as R from 'ramda'
import { AnyWaypoint } from '@common/game/types/Waypoint'
import Map from '@common/game/logic/Map'
import WaypointTypes from '@common/game/types/Waypoint'
import {
  State,
  StateFragments,
} from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import RenderLayer from '.'
import { drawArc } from '../drawing/circle'
import { drawPath } from '../drawing/line'
import { InterfaceState } from '@frontend/game/types/InterfaceState'

export default class WaypointsRenderLayer extends RenderLayer {
  constructor(context: CanvasRenderingContext2D) {
    super(context)
  }

  render(
    continuousState: State<'Continuous'>,
    absoluteState: State<'Absolute'>,
    interfaceState: InterfaceState,
    interfaceEvents: InterfaceEventEmitter,
  ) {
    this.context.strokeStyle = 'rgba(255, 255, 255, 0.35)'

    const unitsMap = R.path(['world', 'units'], continuousState)
    const units = R.keys(unitsMap).map(
      key => unitsMap[key],
    ) as StateFragments<'Continuous'>['Unit'][]
    units.forEach(unit => {
      const waypoints: AnyWaypoint[] = unit.waypoints
      Map.interval(waypoints, (waypointA, waypointB) => {
        if (WaypointTypes.isPointWaypoint(waypointB)) {
          drawPath(this.context, [waypointA.position, waypointB.position])
        } else if (WaypointTypes.isRadialWaypoint(waypointB)) {
          drawArc(
            this.context,
            waypointB.pivot,
            waypointB.radius,
            waypointB.angleStart,
            waypointB.angleEnd,
          )
        }
      })
    })
  }
}
