import { Store } from 'redux'
import State from '@common/game/state'
import { DiscreetState } from '@common/game/types/State'

let modelStore

function getModelStore(initialState?: DiscreetState): Store {
  if (initialState || !modelStore) {
    modelStore = State.createStore(initialState)
  }
  return modelStore
}

export default {
  getModelStore,
}
