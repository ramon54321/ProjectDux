import { HEIGHT } from '.'
import { Vector2 } from '@common/game/types/Vector'

const zoom = 10

export function mapPoint(point: Vector2): Vector2 {
  return {
    x: point.x * zoom,
    y: HEIGHT - point.y * zoom,
  }
}

export function mapValue(value: number): number {
  return value * zoom
}
