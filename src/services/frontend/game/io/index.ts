import { EventEmitter } from 'events'
import { IOController } from '@frontend/game/types/IO'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import CanvasIOController from './canvas'

const interfaceState = {

}
const interfaceEvents: InterfaceEventEmitter = new EventEmitter()

const controller: IOController = new CanvasIOController(interfaceState, interfaceEvents)

export default {
  controller,
  interfaceEvents,
  interfaceState,
}
