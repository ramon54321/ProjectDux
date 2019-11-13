import { State } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import { IOController } from '@frontend/game/types/IO'
import { mapPointToWorld } from './pointMapping'
import BackgroundRenderLayer from './render-layers/background'
import UnitsRenderLayer from './render-layers/units'
import WaypointsRenderLayer from './render-layers/waypoints'
import RenderLayer from './render-layers'



export const WIDTH = 1600
export const HEIGHT = 1200





const mouseWorldPosition = { x: 0, y: 0 }




function setCanvasDimensions(canvas: HTMLCanvasElement) {
  canvas.style.width = '800px'
  canvas.style.height = '600px'
  canvas.width = WIDTH
  canvas.height = HEIGHT
}






export default class CanvasIOController implements IOController {
  private interfaceState: any
  private interfaceEvents: InterfaceEventEmitter

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private renderLayers: RenderLayer[]

  constructor(interfaceState: any, interfaceEvents: InterfaceEventEmitter) {
    this.interfaceState = interfaceState
    this.interfaceEvents = interfaceEvents

    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')

    document.getElementById('renderer').appendChild(this.canvas)

    setCanvasDimensions(this.canvas)

    this.canvas.onmousemove = event => {
      const rect = this.canvas.getBoundingClientRect()
      const scaleX = this.canvas.width / rect.width
      const scaleY = this.canvas.height / rect.height
      const x = (event.clientX - rect.left) * scaleX
      const y = (event.clientY - rect.top) * scaleY
      const mappedPoint = mapPointToWorld({ x: x, y: y })
      mouseWorldPosition.x = mappedPoint.x
      mouseWorldPosition.y = mappedPoint.y
    }

    this.renderLayers = [
      new BackgroundRenderLayer(this.context),
      new UnitsRenderLayer(this.context),
      new WaypointsRenderLayer(this.context),
    ]
  }

  render(discreetState: State<'Discreet'>, absoluteState: State<'Absolute'>) {
    this.interfaceState.mouseWorldPosition = mouseWorldPosition

    this.context.clearRect(0, 0, WIDTH, HEIGHT)

    this.renderLayers.forEach(renderLayer =>
      renderLayer.render(
        discreetState,
        absoluteState,
        this.interfaceState,
        this.interfaceEvents,
      ),
    )
  }
}
