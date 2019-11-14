import { Vector2 } from "@common/game/types/Vector"
import { StateFragments } from "@common/game/types/State"

type Mode = 'Normal' | 'MoveCommand'

export interface InterfaceState {
  mouseWorldPosition: Vector2
  mouseButtonState: {
    leftClick: boolean
    rightClick: boolean
    leftHold: boolean
    rightHold: boolean
  }
  keyState: any
  mode: Mode
  nearestUnit?: StateFragments<'Absolute'>['Unit']
  hoverUnit?: StateFragments<'Absolute'>['Unit']
  selectedUnitId?: string
}
