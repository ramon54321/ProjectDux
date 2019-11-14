import { State } from '@common/game/types/State'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import { InterfaceState } from '@frontend/game/types/InterfaceState'
import { IOController } from '@frontend/game/types/IO'
import { mapPointToWorld } from './pointMapping'
import BackgroundRenderLayer from './render-layers/background'
import UnitsRenderLayer from './render-layers/units'
import WaypointsRenderLayer from './render-layers/waypoints'
import RenderLayer from './render-layers'
import { mapKeyCodeToKey } from '@frontend/game/io/mappers/keymap'
import { updateInterfaceState } from '@frontend/game/io/state'
import CommandRenderLayer from './render-layers/command'
import ModeRenderLayer from './render-layers/mode'

export const WIDTH = 1600
export const HEIGHT = 1200

function setCanvasDimensions(canvas: HTMLCanvasElement) {
  canvas.style.width = '800px'
  canvas.style.height = '600px'
  canvas.width = WIDTH
  canvas.height = HEIGHT
}

export default class CanvasIOController implements IOController {
  private interfaceState: InterfaceState
  private interfaceEvents: InterfaceEventEmitter

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private renderLayers: RenderLayer[]

  constructor(interfaceState: InterfaceState, interfaceEvents: InterfaceEventEmitter) {
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
      this.interfaceState.mouseWorldPosition.x = mappedPoint.x
      this.interfaceState.mouseWorldPosition.y = mappedPoint.y
    }

    this.canvas.onmousedown = event => {
      switch (event.button) {
        case 0:
          this.interfaceState.mouseButtonState.leftClick = true
          this.interfaceState.mouseButtonState.leftHold = true
          break
        case 2:
          this.interfaceState.mouseButtonState.rightClick = true
          this.interfaceState.mouseButtonState.rightHold = true
          break
      }
    }

    this.canvas.onmouseup = event => {
      switch (event.button) {
        case 0:
          this.interfaceState.mouseButtonState.leftHold = false
          break
        case 2:
          this.interfaceState.mouseButtonState.rightHold = false
          break
      }
    }

    document.onkeydown = event => {
      this.interfaceState.keyState[mapKeyCodeToKey(event.keyCode)] = true
    }

    document.onkeyup = event => {
      this.interfaceState.keyState[mapKeyCodeToKey(event.keyCode)] = false
    }

    this.renderLayers = [
      new BackgroundRenderLayer(this.context),
      new CommandRenderLayer(this.context),
      new UnitsRenderLayer(this.context),
      new WaypointsRenderLayer(this.context),
      new ModeRenderLayer(this.context),
    ]
  }

  render(
    continuousState: State<'Continuous'>,
    absoluteState: State<'Absolute'>,
  ) {
    updateInterfaceState(this.interfaceState, this.interfaceEvents, continuousState, absoluteState)

    this.context.clearRect(0, 0, WIDTH, HEIGHT)

    this.renderLayers.forEach(renderLayer =>
      renderLayer.render(
        continuousState,
        absoluteState,
        this.interfaceState,
        this.interfaceEvents,
      ),
    )
  }
}
