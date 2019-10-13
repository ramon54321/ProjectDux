import { HEIGHT } from '.'
import { Vector2 } from '@common/game/types/Vector'

const zoom = 10

export function mapPointToCanvas(point: Vector2): Vector2 {
  return {
    x: point.x * zoom,
    y: HEIGHT - point.y * zoom,
  }
}

export function mapPointToWorld(point: Vector2): Vector2 {
  return {
    x: point.x / zoom,
    y: (HEIGHT - point.y) / zoom,
  }
}

export function mapValueToCanvas(value: number): number {
  return value * zoom
}

export function mapValueToWorld(value: number): number {
  return value / zoom
}

export function mapAngleToCanvas(angle: number): number {
  return -angle
}

export function mapAngleToWorld(angle: number): number {
  return -angle
}
