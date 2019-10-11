import Queue from '@common/game/utils/Queue'
import Manipulation from '@server/game/manipulation'
import '@server/game/socket-events'

import CommonState from '@common/game/state'
import ServerState from '@server/game/state'
import { generateShortId } from '../../../common/game/utils/id'
import Dispatcher from './dispatcher'
import { generateRandomName } from '../../../common/game/utils/names'
import Path from './path'

type SRA = Game.RequestActions.SocketRequestAction

export const socketRequestActionQueue = new Queue<SRA>()

const tickNumberProcesses = {
  5: () => {
    Dispatcher.dispatch(
      CommonState.Actions.spawn(generateShortId(), generateRandomName(), 1, {
        x: 0,
        y: 0,
      }),
    )
  },
  10: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    const timestamp = Date.now()
    const waypoints = Path.pointsToWaypoints([
      {
        x: 0,
        y: 0,
      },
      {
        x: 50,
        y: 0,
      },
      {
        x: 25,
        y: 50,
      },
      {
        x: 40,
        y: 70,
      },
      {
        x: 70,
        y: 40,
      },
    ], 5, 4).map(waypoint => ({
      ...waypoint,
      timestamp: (waypoint.timestamp * 1000) + timestamp,
    }))
    Dispatcher.dispatch(
      CommonState.Actions.setWaypoints(id, waypoints)
    )
  },
  22: () => {
    // const absoluteState = ServerState.getAbsoluteState()
    // const id = Object.keys(absoluteState.world.units)[0]
    // Dispatcher.dispatch(CommonState.Actions.destroy(id))
  },
}

let tickNumber = 0
setInterval(() => {
  console.log('Tick:', tickNumber)

  // Process Requests
  socketRequestActionQueue.dequeueAll(Manipulation.applySocketRequestAction)

  // Process Model
  const process = tickNumberProcesses[tickNumber]
  if (process) {
    process()
  }

  tickNumber++
}, 1000)
