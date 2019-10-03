import { AnyAction } from "redux"
import { fullState } from "@common/game/model/state/actions/actions"
import { broadcast, send } from '@server/model/sockets'
import { store } from "@server/game/state"

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
