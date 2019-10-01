type ActionType = 'spawn' | 'destroy'
interface Action {
  type: ActionType
  payload: any
}
// type ActionCreator = (...args: any[]) => Action

export const fullState = (state: Game.Reducer) => ({
  type: 'full_state',
  payload: state,
})

export const spawn = (id: string, name: string, level: number) => ({
  type: 'spawn',
  payload: {
    id: id,
    name: name,
    level: level,
  },
})

export const setWaypoints = (id: string, waypoints: Game.State.Timestamped<Game.State.Vector2>[]) => ({
  type: 'set_waypoints',
  payload: {
    id: id,
    waypoints: waypoints,
  }
})
