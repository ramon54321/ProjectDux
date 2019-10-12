import * as R from 'ramda'
import { mapPoint } from './pointMapping'
import { Vector2 } from '@common/game/types/Vector'

export function drawPath(
  context: CanvasRenderingContext2D,
  points: Vector2[],
) {
  if (points.length < 2) {
    return
  }
  const mappedPoints = points.map(mapPoint)
  context.beginPath()
  context.moveTo(mappedPoints[0].x, mappedPoints[0].y)
  R.tail(mappedPoints).map(point => context.lineTo(point.x, point.y))
  context.stroke()
}
