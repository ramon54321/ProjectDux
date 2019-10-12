import Interpolation from '@common/game/math/Interpolation'
import Vector from '@common/game/math/Vector'
import { AnyWaypoint } from '@common/game/types/Waypoint'
import { Vector2 } from '@common/game/types/Vector'
import WaypointTypes from '@common/game/types/Waypoint'

export function mapPositionFromWaypoints(
  waypoints: AnyWaypoint[],
  timestamp: number,
): Vector2 {
  if (waypoints.length === 0) {
    return { x: 0, y: 0 }
  }

  if (waypoints.length === 1) {
    return { x: waypoints[0].position.x, y: waypoints[0].position.y }
  }

  const waypointFirstAhead = waypoints.findIndex(
    waypoint => waypoint.timestamp > timestamp,
  )

  // All waypoints are in the past -> Return last waypoint
  if (waypointFirstAhead < 0) {
    const waypoint = waypoints[waypoints.length - 1]
    return { x: waypoint.position.x, y: waypoint.position.y }
  }

  // First waypoint is in the future -> Return first waypoint
  if (waypointFirstAhead === 0) {
    const waypoint = waypoints[0]
    return { x: waypoint.position.x, y: waypoint.position.y }
  }

  const waypointA = waypoints[waypointFirstAhead - 1]
  const waypointB = waypoints[waypointFirstAhead]

  // Timestamp is somewhere between two waypoints
  if (WaypointTypes.isPointWaypoint(waypointB)) {
    const t = Interpolation.inverseLerp(
      waypointA.timestamp,
      waypointB.timestamp,
      timestamp,
    )
    const ix = Interpolation.lerp(waypointA.position.x, waypointB.position.x, t)
    const iy = Interpolation.lerp(waypointA.position.y, waypointB.position.y, t)
    return { x: ix, y: iy }
  } else if (WaypointTypes.isRadialWaypoint(waypointB)) {
    const t = Interpolation.inverseLerp(
      waypointA.timestamp,
      waypointB.timestamp,
      timestamp,
    )
    const angle = Interpolation.lerp(
      waypointB.angleStart,
      waypointB.angleEnd,
      t,
    )
    const offset = Vector.scale(Vector.angleVector(angle), waypointB.radius)
    const position = Vector.add(offset, waypointB.pivot)
    return position
  }
}
