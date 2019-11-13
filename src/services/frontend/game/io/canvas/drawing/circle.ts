import { mapPointToCanvas, mapValueToCanvas, mapAngleToCanvas } from '../pointMapping'
import { Vector2 } from '@common/game/types/Vector'

export function drawCircle(
  context: CanvasRenderingContext2D,
  center: Vector2,
  radius: number,
) {
  const mappedCenter = mapPointToCanvas(center)
  const mappedRadius = mapValueToCanvas(radius)
  context.beginPath()
  context.arc(mappedCenter.x, mappedCenter.y, mappedRadius, 0, Math.PI * 2)
  context.stroke()
}

export function drawArc(
  context: CanvasRenderingContext2D,
  center: Vector2,
  radius: number,
  start: number,
  end: number,
) {
  const mappedCenter = mapPointToCanvas(center)
  const mappedRadius = mapValueToCanvas(radius)
  const mappedStart = mapAngleToCanvas(start)
  const mappedEnd = mapAngleToCanvas(end)
  const counterClockwise = mappedStart > mappedEnd
  context.beginPath()
  context.arc(
    mappedCenter.x,
    mappedCenter.y,
    mappedRadius,
    mappedStart,
    mappedEnd,
    counterClockwise,
  )
  context.stroke()
}

export function drawCircleSolid(
  context: CanvasRenderingContext2D,
  center: Vector2,
  radius: number,
) {
  const mappedCenter = mapPointToCanvas(center)
  const mappedRadius = mapValueToCanvas(radius)
  context.beginPath()
  context.arc(mappedCenter.x, mappedCenter.y, mappedRadius, 0, Math.PI * 2)
  context.fill()
}
