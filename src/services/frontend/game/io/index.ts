import { DiscreetState, AbsoluteState } from '@common/game/types/State'
import Canvas from './canvas'
import { EventEmitter } from 'events'

const events = new EventEmitter()

function render(discreetState: DiscreetState, absoluteState: AbsoluteState) {
  Canvas.render(discreetState, absoluteState, events)
}

export default {
  render,
  events,
}
