import * as R from 'ramda'
import Vector from '@common/game/math/Vector'
import Circle from '@common/game/math/Circle'

type Vector2 = Game.Vector2

function pointsToWaypoints(points: Vector2[], speed: number, radius: number) {
  const baseWaypoints: Game.Waypoint[] = points.map((point, index) => ({
    type: 'Point',
    x: point.x,
    y: point.y,
    timestamp: -1,
  }))

  const positionalWaypoints = R.flatten(baseWaypoints.map((waypoint, index) => {
    const isFirstWaypoint = index === 0
    const isLastWaypoint = index === baseWaypoints.length - 1

    if (isFirstWaypoint || isLastWaypoint || waypoint.type !== 'Point') {
      return waypoint
    }

    const previousWaypoint = baseWaypoints[index - 1]
    const nextWaypoint = baseWaypoints[index + 1]

    const A = { x: previousWaypoint.x, y: previousWaypoint.y }
    const B = { x: waypoint.x, y: waypoint.y }
    const C = { x: nextWaypoint.x, y: nextWaypoint.y }

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

    const angleStartCorrected = isObtuse && isStartSmaller ? angleStart + Math.PI * 2 : angleStart
    const angleEndCorrected = isObtuse && !isStartSmaller ? angleEnd + Math.PI * 2 : angleEnd

    return [
      {
        type: 'Point',
        timestamp: waypoint.timestamp,
        x: BA.x,
        y: BA.y,
      },
      {
        type: 'Radial',
        timestamp: waypoint.timestamp,
        radius: radius,
        angleStart: angleStartCorrected,
        angleEnd: angleEndCorrected,
        pivotX: D.x,
        pivotY: D.y,
        x: BC.x,
        y: BC.y,
      },
    ]
  })) as Game.Waypoint[]

  const waypoints = (timeAccumulation => positionalWaypoints.map((waypoint, index) => {
    const isFirstWaypoint = index === 0

    if (isFirstWaypoint) {
      return {
        ...waypoint,
        timestamp: 0,
      }
    }

    const previousWaypoint = positionalWaypoints[index - 1]

    const distance = (() => {
      if (waypoint.type === 'Point') {
        return Vector.distance({
          x: previousWaypoint.x,
          y: previousWaypoint.y,
        }, {
          x: waypoint.x,
          y: waypoint.y,
        })
      } else if (waypoint.type === 'Radial') {
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
