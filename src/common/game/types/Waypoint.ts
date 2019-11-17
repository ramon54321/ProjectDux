import { Vector2 } from './Vector'

function isPointWaypoint(waypoint: any): waypoint is Waypoint<'Point'> {
  return waypoint.type === 'Point'
}

function isRadialWaypoint(
  waypoint: any,
): waypoint is Waypoint<'Radial'> {
  return waypoint.type === 'Radial'
}

export default {
  isPointWaypoint,
  isRadialWaypoint,
}

interface WaypointPayloads {
  Point: {}
  Radial: {
    pivot: Vector2
    radius: number
    angleStart: number
    angleEnd: number
  }
}
export type WaypointTypes = keyof WaypointPayloads

export type AnyWaypoint = Waypoint<WaypointTypes>
export type Waypoint<T extends WaypointTypes> = {
  type: T
  timestamp: number
  position: Vector2
  speed: number
  distance: number
} & WaypointPayloads[T]

export type StageAWaypoint<T extends WaypointTypes> = {
  type: T
  position: Vector2
} & WaypointPayloads[T]

export type StageBWaypoint<T extends WaypointTypes> = {
  distancePreviousSection: number
  distanceFromStart: number
  distanceFromEnd: number
} & StageAWaypoint<T>

export type StageCWaypoint<T extends WaypointTypes> = {
  speed: number
} & StageBWaypoint<T>

export type StageDWaypoint<T extends WaypointTypes> = {
  timestamp: number
} & StageCWaypoint<T>
