import { combineReducers } from 'redux'

const unitsReducer = (current: Game.State.Unit[] = [], action): Game.State.Unit[] => {
  if (action.type === 'spawn') {
    const {id, name, level} = action.payload
    const unit: Game.State.Unit = {
      id: id,
      name: name,
      level: level,
      waypoints: [],
    }
    return [...current, unit]
  } else if (action.type === 'set_waypoints') {
    return current.map(unit => {
      if (unit.id === action.payload.id) {
        return {
          ...unit,
          waypoints: action.payload.waypoints
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
