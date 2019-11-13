import { Store } from 'redux'
import StateManager from '@common/game/state'
import { State } from '@common/game/types/State'

let modelStore

function getModelStore(initialState?: State<'Discreet'>): Store {
  if (initialState || !modelStore) {
    modelStore = StateManager.createStore(initialState)
  }
  return modelStore
}

export default {
  getModelStore,
}
