import { createStore as createStoreRedux } from 'redux'
import Actions from './actions'
import Processor from './processor'
import reducers from './reducers'
import Utils from './utils'

function createStore(initialState?) {
  return createStoreRedux(reducers, initialState)
}

export default {
  createStore,
  Processor: Processor,
  Actions: Actions,
  Utils: Utils,
}
