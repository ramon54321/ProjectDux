import StateManager from '@common/game/state-manager'
import Vector from '@common/game/math/Vector'
import { State } from '@common/game/types/State'
import { InterfaceState } from '@frontend/game/types/InterfaceState'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'

export function updateInterfaceState(
  interfaceState: InterfaceState,
  interfaceEvents: InterfaceEventEmitter,
  continuousState: State<'Continuous'>,
  absoluteState: State<'Absolute'>,
) {
  if (interfaceState.keyState['q']) {
    interfaceState.mode = 'Normal'
  } else if (interfaceState.keyState['m']) {
    interfaceState.mode = 'MoveCommand'
  }

  interfaceState.nearestUnit = StateManager.Utils.getNearestUnit(
    absoluteState,
    interfaceState.mouseWorldPosition,
  )

  interfaceState.hoverUnit =
    interfaceState.nearestUnit &&
    Vector.distance(
      interfaceState.nearestUnit.position,
      interfaceState.mouseWorldPosition,
    ) < 10 &&
    interfaceState.nearestUnit

  if (interfaceState.mouseButtonState.leftClick) {
    interfaceState.selectedUnitId = interfaceState.hoverUnit.id
  }

  interfaceEvents.emit('tick_ui', interfaceState)

  // Reset Click State
  interfaceState.mouseButtonState.leftClick = false
  interfaceState.mouseButtonState.rightClick = false
}
