import { createStore as createStoreRedux } from 'redux'
import reducers from './reducers/reducers'

export default function createStore(initialState?) {
  return createStoreRedux(reducers, initialState)
}
