import { Store } from 'redux'
import StateManager from '@common/game/state-manager'
import { State } from '@common/game/types/State'

let modelStore

function getModelStore(initialState?: State<'Continuous'>): Store {
  if (initialState || !modelStore) {
    modelStore = StateManager.createStore(initialState)
  }
  return modelStore
}

export default {
  getModelStore,
}
