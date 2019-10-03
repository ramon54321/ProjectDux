import { AnyAction } from 'redux'
import State from '@common/game/state'
import { broadcast, send } from '@server/model/sockets'
import ServerState from '@server/game/state'

function dispatch(action: AnyAction) {
  ServerState.store.dispatch(action)
  broadcast(JSON.stringify(action))
}

function dispatchFullState() {
  const action = State.Actions.fullState(ServerState.store.getState())
  broadcast(JSON.stringify(action))
}

function dispatchFullStateToSocket(socketId: string) {
  const action = State.Actions.fullState(ServerState.store.getState())
  send(socketId, JSON.stringify(action))
}

export default {
  dispatch,
  dispatchFullState,
  dispatchFullStateToSocket,
}
