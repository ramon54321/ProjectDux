import { combineReducers } from 'redux'

const reducers: Game.Actions.ReducerMap = {
  spawn: (current, payload) => {
    const { id, name, level } = payload
    const unit = {
      id: id,
      name: name,
      level: level,
      waypoints: [],
    }
    return [...current, unit]
  },
  setWaypoints: (current, payload) => {
    return current.map(unit => {
      if (unit.id === payload.id) {
        return {
          ...unit,
          waypoints: payload.waypoints,
        }
      }
      return unit
    })
  },
}

const unitsReducer = (current: Game.DiscreetState.Unit[] = [], action): Game.DiscreetState.Unit[] => {
  const reducer = reducers[action.type]
  return reducer ? reducer(current, action.payload) : current
}

export default combineReducers<Game.DiscreetState.DiscreetState>({
  world: combineReducers({
    units: unitsReducer,
  }),
})
