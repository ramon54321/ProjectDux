import { getShortId } from '@common/game/utils/id'
import {
  RequestReactionMap,
  SocketRequestAction,
} from '@common/game/types/RequestActions'

import CommonState from '@common/game/state'
import ServerState from '@server/game/state'
import Path from '@server/game/path'
import Dispatcher from '@server/game/dispatcher'

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

    const absoluteState = ServerState.getAbsoluteState()

    const currentPosition = absoluteState.world.units[id].position

    const timestamp = Date.now()
    const waypoints = Path.pointsToWaypoints(
      [
        currentPosition,
        target,
      ],
      8,
      6,
    ).map(waypoint => ({
      ...waypoint,
      timestamp: waypoint.timestamp * 1000 + timestamp,
    }))
    Dispatcher.dispatch(CommonState.Actions.setWaypoints(id, waypoints))
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
