import { mapPositionFromWaypoints } from './position'
import Map from '@common/game/logic/Map'
import {
  DiscreetState,
  AbsoluteState,
  DiscreetStateTypes,
} from '@common/game/types/State'

function getAbsoluteState(discreetState: DiscreetState): AbsoluteState {
  const timestamp = Date.now()
  return {
    world: {
      units: Map.props<DiscreetStateTypes['Unit']>(
        discreetState.world.units,
        unit => ({
          id: unit.id,
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
