import { Store } from 'redux'
import State from '@common/game/state'
import { DiscreetState } from '@common/game/types/State'

let store

function getStore(initialState?: DiscreetState): Store {
  if (initialState || !store) {
    store = State.createStore(initialState)
  }
  return store
}

export default {
  getStore,
}
