import createStoreCommon from '../../../common/game/model/store'
import { Store } from 'redux'

let store

export default function getStore(initialState?: Game.Reducer): Store {
  if (initialState || !store) {
    store = createStoreCommon(initialState)
  }
  return store
}
