import { combineReducers } from 'redux'

const unitsReducer = (current = [], action) => {
  if (action.type === 'spawn') {
    return [...current, action.payload]
  }
  return current
}

export default combineReducers({
  world: combineReducers({
    units: unitsReducer,
  }),
})
