export const fullState = (state: Game.DiscreetState.DiscreetState) => ({
  type: 'fullState',
  payload: state,
})

const spawn = (
  id: string,
  name: string,
  level: number,
): Game.Actions.Action<'spawn'> => ({
  type: 'spawn',
  payload: {
    id: id,
    name: name,
    level: level,
  },
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
  setWaypoints: setWaypoints,
}

export default actions
