import { combineReducers } from 'redux'
import { DiscreetStateTypes, DiscreetState } from '@common/game/types/State'
import { ReducerMap } from '@common/game/types/Actions'

const reducers: ReducerMap = {
  spawn: (current, payload) => {
    const { id, name, level, position } = payload
    const unit: DiscreetStateTypes['Unit'] = {
      id: id,
      name: name,
      level: level,
      waypoints: [
        {
          timestamp: 0,
          type: 'Point',
          position: {
            x: position.x,
            y: position.y,
          },
        },
      ],
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

const unitsReducer = (
  current: { [key: string]: DiscreetStateTypes['Unit'] } = {},
  action,
): { [key: string]: DiscreetStateTypes['Unit'] } => {
  const reducer = reducers[action.type]
  return reducer ? reducer(current, action.payload) : current
}

export default combineReducers<DiscreetState>({
  world: combineReducers({
    units: unitsReducer,
  }),
})
