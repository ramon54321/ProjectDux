import { DiscreetState, AbsoluteState } from '@common/game/types/State'
import Canvas from './canvas'

function render(discreetState: DiscreetState, absoluteState: AbsoluteState) {
  Canvas.render(discreetState, absoluteState)
}

export default {
  render,
}
