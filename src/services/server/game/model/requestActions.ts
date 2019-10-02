import { getShortId } from '../../utils/id'

const requestActions: Game.RequestActions.RequestActionMap = {
  log: (socketId, payload) => {
    console.log(`Client ${getShortId(socketId)} Logs:`, payload.message)
  },
}

export function applySocketRequestAction(
  socketRequestAction: Game.RequestActions.SocketRequestAction,
) {
  const requestAction = requestActions[socketRequestAction.requestAction.type]
  return requestAction
    ? requestAction(
        socketRequestAction.id,
        socketRequestAction.requestAction.payload,
      )
    : undefined
}
