import { Store } from 'redux'
import State from '@common/game/state'

let store

function getStore(initialState?: Game.DiscreetState.DiscreetState): Store {
  if (initialState || !store) {
    store = State.createStore(initialState)
  }
  return store
}

export default {
  getStore
}
