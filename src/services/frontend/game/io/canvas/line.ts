import * as R from 'ramda'
import { mapPointToCanvas } from './pointMapping'
import { Vector2 } from '@common/game/types/Vector'

export function drawLine(
  context: CanvasRenderingContext2D,
  start: Vector2,
  end: Vector2,
) {
  const mappedStart = mapPointToCanvas(start)
  const mappedEnd = mapPointToCanvas(end)
  context.beginPath()
  context.moveTo(mappedStart.x, mappedStart.y)
  context.lineTo(mappedEnd.x, mappedEnd.y)
  context.stroke()
}

export function drawPath(context: CanvasRenderingContext2D, points: Vector2[]) {
  if (points.length < 2) {
    return
  }
  const mappedPoints = points.map(mapPointToCanvas)
  context.beginPath()
  context.moveTo(mappedPoints[0].x, mappedPoints[0].y)
  R.tail(mappedPoints).map(point => context.lineTo(point.x, point.y))
  context.stroke()
}
