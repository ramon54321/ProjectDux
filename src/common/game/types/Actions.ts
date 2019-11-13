import { Vector2 } from './Vector'
import { AnyWaypoint } from './Waypoint'
import { UnitType } from './State'

export interface ActionCreators {
  spawn: (
    id: string,
    type: UnitType,
    name: string,
    level: number,
    position: Vector2,
  ) => Action<'spawn'>
  destroy: (id: String) => Action<'destroy'>
  setWaypoints: (id: string, waypoints: AnyWaypoint[]) => Action<'setWaypoints'>
}

interface ActionPayloads {
  spawn: {
    id: string
    type: UnitType
    name: string
    level: number
    position: Vector2
  }
  destroy: {
    id: string
  }
  setWaypoints: {
    id: string
    waypoints: AnyWaypoint[]
  }
}

type ActionTypes = keyof ActionPayloads
export type Action<T extends ActionTypes> = T extends ActionTypes
  ? {
      type: T
      payload: ActionPayloads[T]
    }
  : never
export type AnyAction = Action<ActionTypes>
export type ActionMap = {
  [P in keyof ActionPayloads]: ActionCreators[P]
}
export type ReducerMap = {
  [P in keyof ActionPayloads]: (current: any, payload: ActionPayloads[P]) => any
}
