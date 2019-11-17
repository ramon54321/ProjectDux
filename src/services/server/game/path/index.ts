import * as R from 'ramda'
import WaypointType, {
  AnyWaypoint,
  StageAWaypoint,
  WaypointTypes,
  StageBWaypoint,
  StageCWaypoint,
  StageDWaypoint,
} from '@common/game/types/Waypoint'
import Vector from '@common/game/math/Vector'
import Circle from '@common/game/math/Circle'
import { Vector2 } from '@common/game/types/Vector'
import Interpolation from '@common/game/math/Interpolation'

function splitRadialWaypoint(waypoint: StageBWaypoint<'Radial'>, t: number): StageBWaypoint<'Radial'>[] {
  const angle = Interpolation.lerp(
    waypoint.angleStart,
    waypoint.angleEnd,
    t,
  )
  const offset = Vector.scale(Vector.angleVector(angle), waypoint.radius)
  const midPoint = Vector.add(offset, waypoint.pivot)
  const sectionADistance = Interpolation.lerp(0, waypoint.distancePreviousSection, t)
  const sectionBDistance = waypoint.distancePreviousSection - sectionADistance

  const waypointPartA: StageBWaypoint<'Radial'> = {
    type: 'Radial',
    position: midPoint,
    radius: waypoint.radius,
    angleStart: waypoint.angleStart,
    angleEnd: angle,
    pivot: waypoint.pivot,
    distancePreviousSection: sectionADistance,
    distanceFromStart: waypoint.distanceFromStart - sectionBDistance,
    distanceFromEnd: waypoint.distanceFromEnd + sectionBDistance,
  }

  const waypointPartB: StageBWaypoint<'Radial'> = {
    type: 'Radial',
    position: waypoint.position,
    radius: waypoint.radius,
    angleStart: angle,
    angleEnd: waypoint.angleEnd,
    pivot: waypoint.pivot,
    distancePreviousSection: sectionBDistance,
    distanceFromStart: waypoint.distanceFromStart,
    distanceFromEnd: waypoint.distanceFromEnd,
  }

  return [
    waypointPartA,
    waypointPartB,
  ]
}

function getPathLength(path: { position: Vector2 }[]): number {
  return path.reduce((totalDistance, waypoint, index) => {
    const isFirstWaypoint = index === 0
    if (isFirstWaypoint) {
      return 0
    }
    const previousWaypoint = path[index - 1]
    const sectionDistance = (() => {
      if (WaypointType.isPointWaypoint(waypoint)) {
        return Vector.distance(previousWaypoint.position, waypoint.position)
      } else if (WaypointType.isRadialWaypoint(waypoint)) {
        const angleDelta = Math.abs(waypoint.angleEnd - waypoint.angleStart)
        return Circle.arcLength(waypoint.radius, angleDelta)
      }
    })()
    return totalDistance + sectionDistance
  }, 0)
}

function findPointPath(): Vector2[] {
  return [
    {
      x: 0,
      y: 10,
    },
    {
      x: 50,
      y: 10,
    },
    {
      x: 25,
      y: 50,
    },
    {
      x: 40,
      y: 70,
    },
    {
      x: 70,
      y: 40,
    },
  ]
}

function smoothPointPath(
  pointPath: Vector2[],
  radius: number,
): StageAWaypoint<WaypointTypes>[] {
  const waypoints = pointPath.map((waypoint, index) => {
    const isFirstWaypoint = index === 0
    const isLastWaypoint = index === pointPath.length - 1

    if (isFirstWaypoint || isLastWaypoint) {
      return {
        type: 'Point',
        position: waypoint,
      }
    }

    const previousWaypoint = pointPath[index - 1]
    const nextWaypoint = pointPath[index + 1]

    const A = previousWaypoint
    const B = waypoint
    const C = nextWaypoint

    const ba = Vector.fromPoints(B, A)
    const bc = Vector.fromPoints(B, C)

    const ABC = Vector.angleBetween(ba, bc)
    if (ABC === Math.PI) {
      return {
        type: 'Point',
        position: waypoint,
      }
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

    const subWaypoints: StageAWaypoint<WaypointTypes>[] = [
      {
        type: 'Point',
        position: BA,
      },
      {
        type: 'Radial',
        position: BC,
        radius: radius,
        angleStart: angleStartCorrected,
        angleEnd: angleEndCorrected,
        pivot: D,
      },
    ]
    return subWaypoints
  })
  return R.flatten(waypoints) as StageAWaypoint<WaypointTypes>[]
}

function distanceSmoothPath(
  smoothPath: StageAWaypoint<WaypointTypes>[],
): StageBWaypoint<WaypointTypes>[] {
  const pathLength = getPathLength(smoothPath)
  const waypoints: StageBWaypoint<WaypointTypes>[] = smoothPath.map(
    (waypoint, index) => {
      const isFirstWaypoint = index === 0

      if (isFirstWaypoint) {
        return {
          ...waypoint,
          distancePreviousSection: 0,
          distanceFromStart: 0,
          distanceFromEnd: pathLength,
        }
      }
      const distancePreviousSection = getPathLength(
        smoothPath.slice(index - 1, index + 1),
      )
      const distanceFromStart = getPathLength(smoothPath.slice(0, index + 1))

      return {
        ...waypoint,
        distancePreviousSection: distancePreviousSection,
        distanceFromStart: distanceFromStart,
        distanceFromEnd: pathLength - distanceFromStart,
      }
    },
  )
  return waypoints
}

function speedifyPath(
  distancePath: StageBWaypoint<WaypointTypes>[],
  speed: number,
  acceleration: number,
  deceleration: number,
): StageCWaypoint<WaypointTypes>[] {
  const accelerationTime = speed / acceleration
  const accelerationDistance = (acceleration * accelerationTime ** 2) / 2
  const decelerationTime = speed / deceleration
  const decelerationDistance = (deceleration * decelerationTime ** 2) / 2

  let alteredWaypoints: StageAWaypoint<WaypointTypes>[] = [...distancePath]

  const accelerationWaypointIndex = distancePath.findIndex(waypoint => waypoint.distanceFromStart > accelerationDistance)
  const accelerationWaypointA = distancePath[accelerationWaypointIndex - 1]
  const accelerationWaypointB = distancePath[accelerationWaypointIndex]
  const accelerationRemainingFactor = Interpolation.inverseLerp(accelerationWaypointA.distanceFromStart, accelerationWaypointB.distanceFromStart, accelerationDistance)

  if (WaypointType.isPointWaypoint(accelerationWaypointB)) {
    alteredWaypoints = [...alteredWaypoints.slice(0, accelerationWaypointIndex), {
      type: 'Point',
      position: {
        x: Interpolation.lerp(accelerationWaypointA.position.x, accelerationWaypointB.position.x, accelerationRemainingFactor),
        y: Interpolation.lerp(accelerationWaypointA.position.y, accelerationWaypointB.position.y, accelerationRemainingFactor),
      },
    }, ...alteredWaypoints.slice(accelerationWaypointIndex, alteredWaypoints.length)]
  } else if (WaypointType.isRadialWaypoint(accelerationWaypointB)) {
    alteredWaypoints = [...alteredWaypoints.slice(0, accelerationWaypointIndex), ...splitRadialWaypoint(accelerationWaypointB, accelerationRemainingFactor), ...alteredWaypoints.slice(accelerationWaypointIndex + 1, alteredWaypoints.length)]
  }

  const getSpeedGivenDistance = (acceleration, distance) => Math.sqrt(2 * acceleration * distance)

  const distancedWaypoints = distanceSmoothPath(alteredWaypoints)

  const speedifiedWaypoints = distancedWaypoints.map((waypoint, index) => {
    const _speed = (() => {
      if (index <= accelerationWaypointIndex) {
        return getSpeedGivenDistance(acceleration, waypoint.distanceFromStart)
      } else {
        return speed
      }
    })()
    return {
      ...waypoint,
      speed: _speed,
    }
  })

  return speedifiedWaypoints
}

function timestampifyPath(
  speedifiedPath: StageCWaypoint<WaypointTypes>[],
): StageDWaypoint<WaypointTypes>[] {
  const timestampWaypoints: StageDWaypoint<WaypointTypes>[] = ((totalTime) => speedifiedPath.map((waypoint, index) => {
    if (index === 0) {
      return {
        ...waypoint,
        timestamp: 0,
      }
    }
    const time = waypoint.distancePreviousSection / ((speedifiedPath[index - 1].speed + waypoint.speed) / 2)
    totalTime += time
    return {
      ...waypoint,
      timestamp: totalTime,
    }
  }))(0)
  return timestampWaypoints
}

function create(
  speed: number,
  radius: number,
  acceleration: number,
  deceleration: number,
): AnyWaypoint[] {
  const pointPath: Vector2[] = findPointPath()
  const smoothPath: StageAWaypoint<WaypointTypes>[] = smoothPointPath(
    pointPath,
    radius,
  )
  const distancedSmoothPath: StageBWaypoint<
    WaypointTypes
  >[] = distanceSmoothPath(smoothPath)
  const speedifiedPath: StageCWaypoint<WaypointTypes>[] = speedifyPath(
    distancedSmoothPath,
    speed,
    acceleration,
    deceleration,
  )
  const timestampedPath: StageDWaypoint<WaypointTypes>[] = timestampifyPath(speedifiedPath)

  console.log('timestampedPath', timestampedPath)

  return (timestampedPath as unknown) as AnyWaypoint[]
}

// function pointsToWaypoints(
//   points: Vector2[],
//   speed: number,
//   radius: number,
//   // acceleration: number,
//   // decelleration: number,
// ): AnyWaypoint[] {
//   const baseWaypoints: AnyWaypoint[] = points.map((point, index) => ({
//     type: 'Point',
//     position: point,
//     speed: -1,
//     timestamp: -1,
//     distance: -1,
//   }))

//   const speedSetWaypoints: AnyWaypoint[] = baseWaypoints.map(
//     (waypoint, index) => {
//       return index === 0 || index === baseWaypoints.length - 1
//         ? {
//             ...waypoint,
//             speed: 0,
//           }
//         : {
//             ...waypoint,
//             speed: speed,
//           }
//     },
//   )

// const convertedWaypoints = speedSetWaypoints.map((waypoint, index) => {
//   const isFirstWaypoint = index === 0
//   const isLastWaypoint = index === speedSetWaypoints.length - 1

//   if (isFirstWaypoint || isLastWaypoint || waypoint.type !== 'Point') {
//     return waypoint
//   }

//   const previousWaypoint = speedSetWaypoints[index - 1]
//   const nextWaypoint = speedSetWaypoints[index + 1]

//   const A = previousWaypoint.position
//   const B = waypoint.position
//   const C = nextWaypoint.position

//   const ba = Vector.fromPoints(B, A)
//   const bc = Vector.fromPoints(B, C)

//   const ABC = Vector.angleBetween(ba, bc)
//   if (ABC === Math.PI) {
//     return waypoint
//   }

//   const bd = Vector.insetPoint(ba, bc, radius)
//   const D = Vector.add(B, bd)

//   const offsetA = Vector.projection(bd, ba)
//   const offsetC = Vector.projection(bd, bc)

//   const BA = Vector.add(B, offsetA)
//   const BC = Vector.add(B, offsetC)

//   const angleStart = Vector.angleTo(BA, D)
//   const angleEnd = Vector.angleTo(BC, D)

//   const isStartSmaller = angleStart < angleEnd
//   const isObtuse = Math.abs(angleEnd - angleStart) > Math.PI

//   const angleStartCorrected =
//     isObtuse && isStartSmaller ? angleStart + Math.PI * 2 : angleStart
//   const angleEndCorrected =
//     isObtuse && !isStartSmaller ? angleEnd + Math.PI * 2 : angleEnd

//   const waypoints: AnyWaypoint[] = [
//     {
//       type: 'Point',
//       speed: waypoint.speed,
//       distance: -1,
//       timestamp: waypoint.timestamp,
//       position: BA,
//     },
//     {
//       type: 'Radial',
//       speed: waypoint.speed,
//       distance: -1,
//       timestamp: waypoint.timestamp,
//       radius: radius,
//       angleStart: angleStartCorrected,
//       angleEnd: angleEndCorrected,
//       pivot: D,
//       position: BC,
//     },
//   ]
//   return waypoints
// })

//   const positionalWaypoints: AnyWaypoint[] = R.flatten(
//     convertedWaypoints,
//   ) as AnyWaypoint[]

//   const distancedWaypoints: AnyWaypoint[] = positionalWaypoints.map(
//     (waypoint, index) => {
//       const isFirstWaypoint = index === 0

//       if (isFirstWaypoint) {
//         return {
//           ...waypoint,
//           distance: 0,
//         }
//       }

//       const previousWaypoint = positionalWaypoints[index - 1]

// const distance = (() => {
//   if (WaypointTypes.isPointWaypoint(waypoint)) {
//     return Vector.distance(previousWaypoint.position, waypoint.position)
//   } else if (WaypointTypes.isRadialWaypoint(waypoint)) {
//     const angleDelta = Math.abs(waypoint.angleEnd - waypoint.angleStart)
//     return Circle.arcLength(radius, angleDelta)
//         }
//       })()

//       return {
//         ...waypoint,
//         distance: distance,
//       }
//     },
//   )

//   // const accelerationTime = speed / acceleration
//   // const accelerationDistance = (acceleration * accelerationTime ** 2) / 2

//   // const accelerationWaypoints = R.flatten(distancedWaypoints.map(waypoint => {
//   //   if ()
//   //   return {
//   //     ...waypoint
//   //   }
//   // })) as AnyWaypoint[]

//   const timestampWaypoints = (timeAccumulation =>
//     distancedWaypoints.map((waypoint, index) => {
//       const isFirstWaypoint = index === 0

//       if (isFirstWaypoint) {
//         return {
//           ...waypoint,
//           timestamp: 0,
//         }
//       }

//       const previousWaypoint = positionalWaypoints[index - 1]

//       const averageSpeed = (previousWaypoint.speed + waypoint.speed) / 2
//       const duration = waypoint.distance / averageSpeed

//       timeAccumulation += duration

//       return {
//         ...waypoint,
//         timestamp: timeAccumulation,
//       }
//     }))(0)

//   return timestampWaypoints
// }

export default {
  create,
}
