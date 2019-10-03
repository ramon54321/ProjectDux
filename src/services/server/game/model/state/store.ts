import createStore from '../../../../../common/game/model/state/store'
import { getAbsoluteState as getCommonAbsoluteState } from '../../../../../common/game/model/state/processor'

export const store = createStore()

export function getAbsoluteState(): Game.AbsoluteState.AbsoluteState {
  return getCommonAbsoluteState(store.getState())
}
