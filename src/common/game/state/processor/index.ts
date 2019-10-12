import { mapPositionFromWaypoints } from './position'
import { mapProps } from '../../utils/mapping'
import {
  DiscreetState,
  AbsoluteState,
  DiscreetStateTypes,
} from '@common/game/types/State'

function getAbsoluteState(discreetState: DiscreetState): AbsoluteState {
  const timestamp = Date.now()
  return {
    world: {
      units: mapProps<DiscreetStateTypes['Unit']>(
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
