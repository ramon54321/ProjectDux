import socket from '../../common/socket'

export function dispatch(requestAction: Game.RequestActions.AnyRequestAction) {
  socket.send(JSON.stringify(requestAction))
}
