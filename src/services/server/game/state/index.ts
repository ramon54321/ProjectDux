import State from '@common/game/state'

export const store = State.createStore()

export function getAbsoluteState(): Game.AbsoluteState.AbsoluteState {
  return State.Processor.getAbsoluteState(store.getState())
}
