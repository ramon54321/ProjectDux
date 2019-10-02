import { combineReducers } from 'redux'

const reducers: Game.Actions.ReducerMap = {
  spawn: (current, payload) => {
    const { id, name, level, position } = payload
    const unit: Game.DiscreetState.Unit = {
      id: id,
      name: name,
      level: level,
      waypoints: [{
        timestamp: 0,
        x: position.x,
        y: position.y,
      }],
    }
    current[id] = unit
    return current
  },
  destroy: (current, payload) => {
    const { id } = payload
    delete current[id]
    return current
  },
  setWaypoints: (current, payload) => {
    const { id, waypoints } = payload
    current[id].waypoints = waypoints
    return current
  },
}

const unitsReducer = (current: {[key: string]: Game.DiscreetState.Unit} = {}, action): {[key: string]: Game.DiscreetState.Unit} => {
  const reducer = reducers[action.type]
  return reducer ? reducer(current, action.payload) : current
}

export default combineReducers<Game.DiscreetState.DiscreetState>({
  world: combineReducers({
    units: unitsReducer,
  }),
})
