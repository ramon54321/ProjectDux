import Queue from '@common/game/utils/Queue'
import Manipulation from '@server/game/manipulation'
import '@server/game/socket-events'

import CommonState from '@common/game/state'
import ServerState from '@server/game/state'
import { generateShortId } from '../../../common/game/utils/id'
import Dispatcher from './dispatcher'
import { generateRandomName } from '../../../common/game/utils/names'

type SRA = Game.RequestActions.SocketRequestAction

export const socketRequestActionQueue = new Queue<SRA>()

const tickNumberProcesses = {
  5: () => {
    Dispatcher.dispatch(
      CommonState.Actions.spawn(generateShortId(), generateRandomName(), 1, { x: 0, y: 0 }),
    )
  },
  10: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    const timestamp = Date.now()
    Dispatcher.dispatch(
      CommonState.Actions.setWaypoints(id, [
        // Need to deduce waypoints from path and speed
        {
          timestamp: timestamp,
          x: 0,
          y: 0,
        },
        {
          timestamp: timestamp + 5000,
          x: 10,
          y: 0,
        },
        {
          timestamp: timestamp + 10000,
          x: 10,
          y: 10,
        },
      ]),
    )
  },
  22: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    Dispatcher.dispatch(CommonState.Actions.destroy(id))
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
