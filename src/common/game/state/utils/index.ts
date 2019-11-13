import { Vector2 } from '@common/game/types/Vector'
import { State, StateFragments } from '@common/game/types/State'
import Map from '@common/game/logic/Map'
import Vector from '@common/game/math/Vector'

function getNearestUnit(absoluteState: State<'Absolute'>, point: Vector2): StateFragments<'Absolute'>['Unit'] {
  let distanceOfNearest = -1
  let nearest = undefined
  Map.props<StateFragments<'Absolute'>['Unit']>(absoluteState.world.units, unit => {
    const distance = Vector.squareDistance(unit.position, point)
    if (distanceOfNearest === -1 || distance < distanceOfNearest) {
      distanceOfNearest = distance
      nearest = unit
    }
  })
  return nearest
}

export default {
  getNearestUnit,
}
