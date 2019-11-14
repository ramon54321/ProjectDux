import { State } from '@common/game/types/State'

export interface IOController {
  render: (continuousState: State<'Continuous'>, absoluteState: State<'Absolute'>) => void
}
