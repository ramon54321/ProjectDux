import { combineReducers } from 'redux'

const unitsReducer = (current = [], action) => {
  if (action.type === 'spawn') {
    const unit = {
      ...action.payload,
      x: 0,
      y: 0,
    }
    return [...current, unit]
  } else if (action.type === 'set_position') {
    return current.map(unit => {
      if (unit.id === action.payload.id) {
        return {
          ...unit,
          x: action.payload.x,
          y: action.payload.y,
        }
      }
      return unit
    })
  }
  return current
}

export default combineReducers<Game.Reducer>({
  world: combineReducers({
    units: unitsReducer,
  }),
})
