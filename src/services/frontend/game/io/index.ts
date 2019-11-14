import { EventEmitter } from 'events'
import { IOController } from '@frontend/game/types/IO'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import CanvasIOController from './canvas'
import { InterfaceState } from '../types/InterfaceState'

const interfaceState: InterfaceState = {
  mouseWorldPosition: { x: 0, y: 0 },
  mouseButtonState: {
    leftClick: false,
    rightClick: false,
    leftHold: false,
    rightHold: false,
  },
  keyState: {},
  mode: 'Normal',
}
const interfaceEvents: InterfaceEventEmitter = new EventEmitter()

const controller: IOController = new CanvasIOController(
  interfaceState,
  interfaceEvents,
)

export default {
  controller,
  interfaceEvents,
  interfaceState,
}
