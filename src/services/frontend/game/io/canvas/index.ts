import * as R from 'ramda'
import { drawPath } from './line'
import { drawCircleSolid, drawArc } from './circle'
import WaypointTypes, { AnyWaypoint } from '@common/game/types/Waypoint'
import {
  DiscreetState,
  DiscreetStateTypes,
  AbsoluteStateTypes,
  AbsoluteState,
} from '@common/game/types/State'
import Map from '@common/game/logic/Map'
import { drawGrid } from './grid'
import { mapPointToWorld } from './pointMapping'
import { Vector2 } from '@common/game/types/Vector'
import { EventEmitter } from 'events'

const rendererParentElement = document.getElementById('renderer')
const canvas: HTMLCanvasElement = document.createElement('canvas')
const context: CanvasRenderingContext2D = canvas.getContext('2d')

export const WIDTH = 1600
export const HEIGHT = 1200

canvas.style.width = '800px'
canvas.style.height = '600px'
canvas.width = WIDTH
canvas.height = HEIGHT

rendererParentElement.appendChild(canvas)

let mouseWorldPosition: Vector2 = {x: 0, y: 0}

canvas.onmousemove = event => {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const x = (event.clientX - rect.left) * scaleX
  const y = (event.clientY - rect.top) * scaleY
  const mappedPoint = mapPointToWorld({x: x, y: y})
  mouseWorldPosition = mappedPoint
}

function renderDiscreetState(discreetState: DiscreetState) {
  // Draw Grid
  const gridBackground = context.createRadialGradient(
    WIDTH / 2,
    HEIGHT / 2,
    0,
    WIDTH / 2,
    HEIGHT / 2,
    1000,
  )
  gridBackground.addColorStop(0, 'rgba(20, 90, 160, 0.85)')
  gridBackground.addColorStop(1, 'rgba(20, 90, 160, 1.0)')
  context.fillStyle = gridBackground
  context.fillRect(0, 0, WIDTH, HEIGHT)
  drawGrid(context, 0, 0, 160, 120)

  // Draw Unit Waypoint Lines
  context.strokeStyle = 'rgba(255, 255, 255, 1.0)'
  const unitsMap = R.path(['world', 'units'], discreetState)
  const units = R.keys(unitsMap).map(
    key => unitsMap[key],
  ) as DiscreetStateTypes['Unit'][]
  units.forEach(unit => {
    const waypoints: AnyWaypoint[] = unit.waypoints
    Map.interval(waypoints, (waypointA, waypointB) => {
      if (WaypointTypes.isPointWaypoint(waypointB)) {
        drawPath(context, [waypointA.position, waypointB.position])
      } else if (WaypointTypes.isRadialWaypoint(waypointB)) {
        drawArc(
          context,
          waypointB.pivot,
          waypointB.radius,
          waypointB.angleStart,
          waypointB.angleEnd,
        )
      }
    })
  })
}

function renderAbsoluteState(absoluteState: AbsoluteState) {
  context.fillStyle = 'rgba(255, 255, 255, 1.0)'

  // Draw Unit Positions
  const unitsMap = R.path(['world', 'units'], absoluteState)
  const units = R.keys(unitsMap).map(
    key => unitsMap[key],
  ) as AbsoluteStateTypes['Unit'][]
  units.forEach(unit => drawCircleSolid(context, unit.position, 1))
}

function render(discreetState: DiscreetState, absoluteState: AbsoluteState, events: EventEmitter) {
  context.clearRect(0, 0, WIDTH, HEIGHT)
  renderDiscreetState(discreetState)
  renderAbsoluteState(absoluteState)
  events.emit('mousemove', mouseWorldPosition)
}

export default {
  render,
}
