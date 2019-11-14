import { getShortId } from '@common/game/utils/id'
import {
  RequestReactionMap,
  SocketRequestAction,
} from '@common/game/types/RequestActions'

import StateManager from '@common/game/state-manager'
import ServerState from '@server/game/state'
import Specs from '@common/game/specs'
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
    const { position, type } = absoluteState.world.units[id]
    const { speed, turnRadius } = Specs.getSpecs(type)

    const timestamp = Date.now()
    const waypoints = Path.pointsToWaypoints(
      [
        position,
        target,
      ],
      speed,
      turnRadius,
    ).map(waypoint => ({
      ...waypoint,
      timestamp: waypoint.timestamp * 1000 + timestamp,
    }))
    Dispatcher.dispatch(StateManager.Actions.setWaypoints(id, waypoints))
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
