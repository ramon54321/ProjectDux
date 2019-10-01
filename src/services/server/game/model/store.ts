import { AnyAction } from "redux"
import createStore from '../../../../common/game/model/store'
import { broadcast, send } from '../../model/sockets'
import { fullState } from "../../../../common/game/model/actions/actions"

const store = createStore()

export function dispatch(action: AnyAction) {
  store.dispatch(action)
  broadcast(JSON.stringify(action))
}

export function dispatchFullState() {
  const action = fullState(store.getState())
  broadcast(JSON.stringify(action))
}

export function dispatchFullStateToSocket(socketId: string) {
  const action = fullState(store.getState())
  send(socketId, JSON.stringify(action))
}
