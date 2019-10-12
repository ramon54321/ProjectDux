import { AnyRequestAction } from '@common/game/types/RequestActions'
import socket from '@frontend/common/socket'

function dispatch(requestAction: AnyRequestAction) {
  socket.send(JSON.stringify(requestAction))
}

export default {
  dispatch
}
