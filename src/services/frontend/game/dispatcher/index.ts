import socket from '@frontend/common/socket'

export function dispatch(requestAction: Game.RequestActions.AnyRequestAction) {
  socket.send(JSON.stringify(requestAction))
}
