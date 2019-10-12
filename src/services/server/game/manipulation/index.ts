import { getShortId } from '@common/game/utils/id'
import {
  RequestReactionMap,
  SocketRequestAction,
} from '@common/game/types/RequestActions'

const requestActions: RequestReactionMap = {
  log: (socketId, payload) => {
    console.log(`Client ${getShortId(socketId)} Logs:`, payload.message)
  },
  moveTo: (socketId, payload) => {
    const { id, target } = payload
    console.log(
      `Client ${getShortId(socketId)} wants to move ${id} to ${JSON.stringify(
        target,
      )}`,
    )
  },
}

function applySocketRequestAction(socketRequestAction: SocketRequestAction) {
  const requestAction = requestActions[socketRequestAction.requestAction.type]
  return requestAction
    ? requestAction(socketRequestAction.id, socketRequestAction.requestAction
        .payload as any)
    : undefined
}

export default {
  applySocketRequestAction,
}
