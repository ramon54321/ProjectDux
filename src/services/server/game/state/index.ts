import State from '@common/game/state'
import { AbsoluteState } from '@common/game/types/State'

const store = State.createStore()

function getAbsoluteState(): AbsoluteState {
  return State.Processor.getAbsoluteState(store.getState())
}

export default {
  store,
  getAbsoluteState,
}
