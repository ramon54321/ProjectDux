import { EventEmitter } from 'events'
import { DiscreetState, AbsoluteState } from '@common/game/types/State'
import { ClientEventEmitter } from '@frontend/game/types/Events'
import Canvas from './canvas'

const events: ClientEventEmitter = new EventEmitter()

function render(discreetState: DiscreetState, absoluteState: AbsoluteState) {
  Canvas.render(discreetState, absoluteState, events)
}

export default {
  render,
  events,
}
