import { State, UnitType } from '@common/game/types/State'
import { Vector2 } from '@common/game/types/Vector'
import { AnyWaypoint } from '@common/game/types/Waypoint'
import { Action, ActionMap } from '@common/game/types/Actions'

const fullState = (state: State<'Discreet'>) => ({
  type: 'fullState',
  payload: state,
})

const spawn = (
  id: string,
  type: UnitType,
  name: string,
  level: number,
  position: Vector2,
): Action<'spawn'> => ({
  type: 'spawn',
  payload: {
    id: id,
    type: type,
    name: name,
    level: level,
    position: position,
  },
})

const destroy = (id: string): Action<'destroy'> => ({
  type: 'destroy',
  payload: {
    id: id,
  },
})

const setWaypoints = (
  id: string,
  waypoints: AnyWaypoint[],
): Action<'setWaypoints'> => ({
  type: 'setWaypoints',
  payload: {
    id: id,
    waypoints: waypoints,
  },
})

const actions: ActionMap = {
  spawn: spawn,
  destroy: destroy,
  setWaypoints: setWaypoints,
}

export default {
  ...actions,
  fullState,
}
