import createStoreCommon from '../../../common/game/model/state/store'
import { Store } from 'redux'

let store

export default function getStore(initialState?: Game.DiscreetState.DiscreetState): Store {
  if (initialState || !store) {
    store = createStoreCommon(initialState)
  }
  return store
}
