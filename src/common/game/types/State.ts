import { AnyWaypoint } from './Waypoint'
import { Vector2 } from './Vector'

export interface DiscreetState {
  world: {
    units: { [key: string]: DiscreetStateTypes['Unit'] }
  }
}
export interface DiscreetStateTypes {
  Unit: {
    id: string
    name: string
    level: number
    waypoints: AnyWaypoint[]
  }
}

export interface AbsoluteState {
  world: {
    units: { [key: string]: AbsoluteStateTypes['Unit'] }
  }
}
export interface AbsoluteStateTypes {
  Unit: {
    id: string
    name: string
    level: number
    position: Vector2
  }
}
