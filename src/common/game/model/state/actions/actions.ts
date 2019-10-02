export const fullState = (state: Game.DiscreetState.DiscreetState) => ({
  type: 'fullState',
  payload: state,
})

const spawn = (
  id: string,
  name: string,
  level: number,
  position: Game.Vector2,
): Game.Actions.Action<'spawn'> => ({
  type: 'spawn',
  payload: {
    id: id,
    name: name,
    level: level,
    position: position,
  },
})

const destroy = (id: string): Game.Actions.Action<'destroy'> => ({
  type: 'destroy',
  payload: {
    id: id,
  }
})

const setWaypoints = (
  id: string,
  waypoints: Game.Waypoint[],
): Game.Actions.Action<'setWaypoints'> => ({
  type: 'setWaypoints',
  payload: {
    id: id,
    waypoints: waypoints,
  },
})

const actions: Game.Actions.ActionMap = {
  spawn: spawn,
  destroy: destroy,
  setWaypoints: setWaypoints,
}

export default actions
