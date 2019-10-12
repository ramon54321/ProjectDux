import * as R from 'ramda'
import { mapPoint, mapValue } from './pointMapping'
import { Vector2 } from '@common/game/types/Vector'

export function drawCircle(
  context: CanvasRenderingContext2D,
  center: Vector2,
  radius: number,
) {
  const mappedCenter = mapPoint(center)
  const mappedRadius = mapValue(radius)
  context.beginPath()
  context.arc(mappedCenter.x, mappedCenter.y, mappedRadius, 0, Math.PI * 2)
  context.stroke()
}

export function drawCircleSolid(
  context: CanvasRenderingContext2D,
  center: Vector2,
  radius: number,
) {
  const mappedCenter = mapPoint(center)
  const mappedRadius = mapValue(radius)
  context.beginPath()
  context.arc(mappedCenter.x, mappedCenter.y, mappedRadius, 0, Math.PI * 2)
  context.fill()
}
