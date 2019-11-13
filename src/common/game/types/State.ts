import { AnyWaypoint } from './Waypoint'
import { Vector2 } from './Vector'

type Movable<S extends StateType> = S extends 'Discreet' ? {
  waypoints: AnyWaypoint[]
} : {
  position: Vector2
}

interface UnitPropertiesMap<S extends StateType> {
  Rifleman: {
    name: string
    level: number
  } & Movable<S>
}

export type UnitType = keyof UnitPropertiesMap<StateType>

type Unit<S extends StateType, T extends UnitType> = {
  id: string
  type: T
} & UnitPropertiesMap<S>[T]

export interface StateFragments<S extends StateType> {
  Unit: Unit<S, UnitType>
}

type StateType = 'Discreet' | 'Absolute'

export interface State<S extends StateType> {
  world: {
    units: { [key: string]: StateFragments<S>['Unit'] }
  }
}
