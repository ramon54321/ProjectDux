import { AnyAction } from "redux"
import { broadcast, send } from '../../model/sockets'
import { fullState } from "../../../../common/game/model/state/actions/actions"
import { store } from "../model/state/store"

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
