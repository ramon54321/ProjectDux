import { Vector2 } from "./Vector"

function isPointWaypoint(waypoint: AnyWaypoint): waypoint is Waypoint<'Point'> {
  return waypoint.type === 'Point'
}

function isRadialWaypoint(waypoint: AnyWaypoint): waypoint is Waypoint<'Radial'> {
  return waypoint.type === 'Radial'
}

export default {
  isPointWaypoint,
  isRadialWaypoint,
}

interface WaypointPayloads {
  Point: {
    position: Vector2
  },
  Radial: {
    position: Vector2,
    pivot: Vector2,
    radius: number,
    angleStart: number,
    angleEnd: number,
  }
}
type WaypointTypes = keyof WaypointPayloads

export type AnyWaypoint = Waypoint<WaypointTypes>
export type Waypoint<T extends WaypointTypes> = {
  type: T
  timestamp: number
} & WaypointPayloads[T]
