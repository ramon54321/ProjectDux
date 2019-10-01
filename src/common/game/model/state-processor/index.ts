import { getPosition } from './position'

export function getAbsoluteState(
  discreetState: Game.DiscreetState.DiscreetState,
): Game.AbsoluteState.AbsoluteState {
  const timestamp = Date.now()
  return {
    world: {
      units: discreetState.world.units.map(unit => ({
        id: unit.id,
        name: unit.name,
        level: unit.level,
        position: getPosition(unit.waypoints, timestamp),
      })),
    },
  }
}
