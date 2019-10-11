import Interpolation from '@common/game/math/Interpolation'
import Vector from '@common/game/math/Vector'

export function mapPositionFromWaypoints(
  waypoints: Game.Waypoint[],
  timestamp: number,
): Game.Vector2 {
  if (waypoints.length === 0) {
    return { x: 0, y: 0 }
  }

  if (waypoints.length === 1) {
    return { x: waypoints[0].x, y: waypoints[0].y }
  }

  const waypointFirstAhead = waypoints.findIndex(
    waypoint => waypoint.timestamp > timestamp,
  )

  // All waypoints are in the past -> Return last waypoint
  if (waypointFirstAhead < 0) {
    const waypoint = waypoints[waypoints.length - 1]
    return { x: waypoint.x, y: waypoint.y }
  }

  // First waypoint is in the future -> Return first waypoint
  if (waypointFirstAhead === 0) {
    const waypoint = waypoints[0]
    return { x: waypoint.x, y: waypoint.y }
  }

  const waypointA = waypoints[waypointFirstAhead - 1]
  const waypointB = waypoints[waypointFirstAhead]

  // Timestamp is somewhere between two waypoints
  if (waypointB.type === 'Point') {
    const t = Interpolation.inverseLerp(waypointA.timestamp, waypointB.timestamp, timestamp)
    const ix = Interpolation.lerp(waypointA.x, waypointB.x, t)
    const iy = Interpolation.lerp(waypointA.y, waypointB.y, t)
    return { x: ix, y: iy }
  } else if (waypointB.type === 'Radial') {
    const t = Interpolation.inverseLerp(waypointA.timestamp, waypointB.timestamp, timestamp)
    const angle = Interpolation.lerp(waypointB.angleStart, waypointB.angleEnd, t)
    const offset = Vector.scale(Vector.angleVector(angle), waypointB.radius)
    const position = Vector.add(offset, {
      x: waypointB.pivotX,
      y: waypointB.pivotY,
    })
    return position
  }
}
