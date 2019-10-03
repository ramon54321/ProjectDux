import { Store } from 'redux'
import createStoreCommon from '@common/game/model/state/store'

let store

export default function getStore(initialState?: Game.DiscreetState.DiscreetState): Store {
  if (initialState || !store) {
    store = createStoreCommon(initialState)
  }
  return store
}
