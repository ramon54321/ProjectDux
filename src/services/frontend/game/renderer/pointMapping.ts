import { HEIGHT } from '.'

const zoom = 10

export function mapPoint(point: Game.Vector2): Game.Vector2 {
  return {
    x: point.x * zoom,
    y: HEIGHT - point.y * zoom,
  }
}

export function mapValue(value: number): number {
  return value * zoom
}
