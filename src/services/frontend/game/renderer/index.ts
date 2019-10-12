import * as R from 'ramda'
import { drawPath } from './line'
import { drawCircleSolid } from './circle'
import { AnyWaypoint } from '@common/game/types/Waypoint'
import {
  DiscreetState,
  DiscreetStateTypes,
  AbsoluteStateTypes,
  AbsoluteState,
} from '@common/game/types/State'

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

function renderDiscreetState(discreetState: DiscreetState) {
  // Draw Unit Waypoint Lines
  const unitsMap = R.path(['world', 'units'], discreetState)
  const units = R.keys(unitsMap).map(
    key => unitsMap[key],
  ) as DiscreetStateTypes['Unit'][]
  units.forEach(unit => {
    const waypoints: AnyWaypoint[] = unit.waypoints
    const points = waypoints.map(waypoint => waypoint.position)
    drawPath(context, points)
  })
}

function renderAbsoluteState(absoluteState: AbsoluteState) {
  // Draw Unit Positions
  const unitsMap = R.path(['world', 'units'], absoluteState)
  const units = R.keys(unitsMap).map(
    key => unitsMap[key],
  ) as AbsoluteStateTypes['Unit'][]
  units.forEach(unit => drawCircleSolid(context, unit.position, 1))
}

function render(discreetState: DiscreetState, absoluteState: AbsoluteState) {
  context.clearRect(0, 0, WIDTH, HEIGHT)
  renderDiscreetState(discreetState)
  renderAbsoluteState(absoluteState)
}

export default {
  render,
}
