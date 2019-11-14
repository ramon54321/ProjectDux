import { mapPositionFromWaypoints } from './position'
import Map from '@common/game/logic/Map'
import {
  State,
  StateFragments,
} from '@common/game/types/State'

function getAbsoluteState(continuousState: State<'Continuous'>): State<'Absolute'> {
  const timestamp = Date.now()
  return {
    world: {
      units: Map.props<StateFragments<'Continuous'>['Unit']>(
        continuousState.world.units,
        unit => ({
          id: unit.id,
          type: unit.type,
          name: unit.name,
          level: unit.level,
          position: mapPositionFromWaypoints(unit.waypoints, timestamp),
        }),
      ),
    },
  }
}

export default {
  getAbsoluteState,
}
