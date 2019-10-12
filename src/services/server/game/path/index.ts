import * as R from 'ramda'
import WaypointTypes, { AnyWaypoint } from '@common/game/types/Waypoint'
import Vector from '@common/game/math/Vector'
import Circle from '@common/game/math/Circle'
import { Vector2 } from '@common/game/types/Vector'

function pointsToWaypoints(
  points: Vector2[],
  speed: number,
  radius: number,
): AnyWaypoint[] {
  const baseWaypoints: AnyWaypoint[] = points.map((point, index) => ({
    type: 'Point',
    position: point,
    timestamp: -1,
  }))

  const convertedWaypoints = baseWaypoints.map((waypoint, index) => {
    const isFirstWaypoint = index === 0
    const isLastWaypoint = index === baseWaypoints.length - 1

    if (isFirstWaypoint || isLastWaypoint || waypoint.type !== 'Point') {
      return waypoint
    }

    const previousWaypoint = baseWaypoints[index - 1]
    const nextWaypoint = baseWaypoints[index + 1]

    const A = previousWaypoint.position
    const B = waypoint.position
    const C = nextWaypoint.position

    const ba = Vector.fromPoints(B, A)
    const bc = Vector.fromPoints(B, C)

    const ABC = Vector.angleBetween(ba, bc)
    if (ABC === Math.PI) {
      return waypoint
    }

    const bd = Vector.insetPoint(ba, bc, radius)
    const D = Vector.add(B, bd)

    const offsetA = Vector.projection(bd, ba)
    const offsetC = Vector.projection(bd, bc)

    const BA = Vector.add(B, offsetA)
    const BC = Vector.add(B, offsetC)

    const angleStart = Vector.angleTo(BA, D)
    const angleEnd = Vector.angleTo(BC, D)

    const isStartSmaller = angleStart < angleEnd
    const isObtuse = Math.abs(angleEnd - angleStart) > Math.PI

    const angleStartCorrected =
      isObtuse && isStartSmaller ? angleStart + Math.PI * 2 : angleStart
    const angleEndCorrected =
      isObtuse && !isStartSmaller ? angleEnd + Math.PI * 2 : angleEnd

    const waypoints: AnyWaypoint[] = [
      {
        type: 'Point',
        timestamp: waypoint.timestamp,
        position: BA,
      },
      {
        type: 'Radial',
        timestamp: waypoint.timestamp,
        radius: radius,
        angleStart: angleStartCorrected,
        angleEnd: angleEndCorrected,
        pivot: D,
        position: BC,
      },
    ]
    return waypoints
  })

  const positionalWaypoints: AnyWaypoint[] = R.flatten(
    convertedWaypoints,
  ) as AnyWaypoint[]

  const waypoints = (timeAccumulation =>
    positionalWaypoints.map((waypoint, index) => {
      const isFirstWaypoint = index === 0

      if (isFirstWaypoint) {
        return {
          ...waypoint,
          timestamp: 0,
        }
      }

      const previousWaypoint = positionalWaypoints[index - 1]

      const distance = (() => {
        if (WaypointTypes.isPointWaypoint(waypoint)) {
          return Vector.distance(previousWaypoint.position, waypoint.position)
        } else if (WaypointTypes.isRadialWaypoint(waypoint)) {
          const angleDelta = Math.abs(waypoint.angleEnd - waypoint.angleStart)
          return Circle.arcLength(radius, angleDelta)
        }
      })()

      const duration = distance / speed

      timeAccumulation += duration

      return {
        ...waypoint,
        timestamp: timeAccumulation,
      }
    }))(0)

  return waypoints
}

export default {
  pointsToWaypoints,
}
