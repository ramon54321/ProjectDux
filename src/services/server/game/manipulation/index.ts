import { getShortId } from '@common/game/utils/id'

const requestActions: Game.RequestActions.RequestReactionMap = {
  log: (socketId, payload) => {
    console.log(`Client ${getShortId(socketId)} Logs:`, payload.message)
  },
  moveTo: (socketId, payload) => {
    console.log('Moving')
  },
}

function applySocketRequestAction(
  socketRequestAction: Game.RequestActions.SocketRequestAction,
) {
  const requestAction = requestActions[socketRequestAction.requestAction.type]
  return requestAction
    ? requestAction(
        socketRequestAction.id,
        socketRequestAction.requestAction.payload as any,
      )
    : undefined
}

export default {
  applySocketRequestAction
}
