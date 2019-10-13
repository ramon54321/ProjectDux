import { drawLine } from './line'

export function drawGrid(
  context: CanvasRenderingContext2D,
  xStart: number,
  yStart: number,
  xEnd: number,
  yEnd: number,
) {
  context.strokeStyle = 'rgba(255, 255, 255, 0.25)'
  for (let x = xStart; x < xEnd; x += 10) {
    drawLine(context, { x: x, y: yStart }, { x: x, y: yEnd })
  }
  for (let y = yStart; y < yEnd; y += 10) {
    drawLine(context, { x: xStart, y: y }, { x: xEnd, y: y })
  }
  context.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  for (let x = xStart; x < xEnd; x += 2.5) {
    if (x % 10 === 0) {
      continue
    }
    drawLine(context, { x: x, y: yStart }, { x: x, y: yEnd })
  }
  for (let y = yStart; y < yEnd; y += 2.5) {
    if (y % 10 === 0) {
      continue
    }
    drawLine(context, { x: xStart, y: y }, { x: xEnd, y: y })
  }
}
