import { State } from '@common/game/types/State'

export interface IOController {
  render: (discreetState: State<'Discreet'>, absoluteState: State<'Absolute'>) => void
}
