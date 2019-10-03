import socket from '@frontend/common/socket'

function dispatch(requestAction: Game.RequestActions.AnyRequestAction) {
  socket.send(JSON.stringify(requestAction))
}

export default {
  dispatch
}
