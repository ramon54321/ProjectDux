import { Vector2 } from '@common/game/types/Vector'
import { mapPointToCanvas } from '../pointMapping'

export function drawText(
  context: CanvasRenderingContext2D,
  text: string,
  position: Vector2,
) {
  const mappedPosition = mapPointToCanvas(position)
  context.fillText(text, mappedPosition.x, mappedPosition.y)
}
