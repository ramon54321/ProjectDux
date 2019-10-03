import { mapPositionFromWaypoints } from './position'
import { mapProps } from '../../utils/mapping'

function getAbsoluteState(
  discreetState: Game.DiscreetState.DiscreetState,
): Game.AbsoluteState.AbsoluteState {
  const timestamp = Date.now()
  return {
    world: {
      units: mapProps<Game.DiscreetState.Unit>(discreetState.world.units, unit => ({
        id: unit.id,
        name: unit.name,
        level: unit.level,
        position: mapPositionFromWaypoints(unit.waypoints, timestamp),
      })),
    },
  }
}

export default {
  getAbsoluteState
}
