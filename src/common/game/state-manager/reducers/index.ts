import { combineReducers } from 'redux'
import { StateFragments, State } from '@common/game/types/State'
import { ReducerMap } from '@common/game/types/Actions'

const reducers: ReducerMap = {
  spawn: (current, payload) => {
    const { id, name, type, level, position } = payload
    const unit: StateFragments<'Continuous'>['Unit'] = {
      id: id,
      type: type,
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
  current: { [key: string]: StateFragments<'Continuous'>['Unit'] } = {},
  action,
): { [key: string]: StateFragments<'Continuous'>['Unit'] } => {
  const reducer = reducers[action.type]
  return reducer ? reducer(current, action.payload) : current
}

export default combineReducers<State<'Continuous'>>({
  world: combineReducers({
    units: unitsReducer,
  }),
})
