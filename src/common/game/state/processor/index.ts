import { mapPositionFromWaypoints } from './position'
import Map from '@common/game/logic/Map'
import {
  State,
  StateFragments,
} from '@common/game/types/State'

function getAbsoluteState(discreetState: State<'Discreet'>): State<'Absolute'> {
  const timestamp = Date.now()
  return {
    world: {
      units: Map.props<StateFragments<'Discreet'>['Unit']>(
        discreetState.world.units,
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
