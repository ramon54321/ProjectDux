import StateManager from '@common/game/state-manager'
import { State } from '@common/game/types/State'

const store = StateManager.createStore()

function getAbsoluteState(): State<'Absolute'> {
  return StateManager.Processor.getAbsoluteState(store.getState())
}

export default {
  store,
  getAbsoluteState,
}
