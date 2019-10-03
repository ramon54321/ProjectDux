import State from '@common/game/state'

const store = State.createStore()

function getAbsoluteState(): Game.AbsoluteState.AbsoluteState {
  return State.Processor.getAbsoluteState(store.getState())
}

export default {
  store,
  getAbsoluteState,
}
