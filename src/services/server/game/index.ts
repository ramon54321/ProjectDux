import Queue from '@server/utils/queue'
import { applySocketRequestAction } from '@server/game/manipulation'
import '@server/game/socket-events'

import State from '@common/game/state'
import { generateShortId } from '../utils/id'
import { getAbsoluteState } from './state'
import { dispatch } from './dispatcher'
import { generateRandomName } from '../utils/names'

type SRA = Game.RequestActions.SocketRequestAction

export const socketRequestActionQueue = new Queue<SRA>()

const tickNumberProcesses = {
  5: () => {
    dispatch(
      State.Actions.spawn(generateShortId(), generateRandomName(), 1, { x: 0, y: 0 }),
    )
  },
  10: () => {
    const absoluteState = getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    const timestamp = Date.now()
    dispatch(
      State.Actions.setWaypoints(id, [
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
    const absoluteState = getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    dispatch(State.Actions.destroy(id))
  },
}

let tickNumber = 0
setInterval(() => {
  console.log('Tick:', tickNumber)

  // Process Requests
  socketRequestActionQueue.dequeueAll(applySocketRequestAction)

  // Process Model
  const process = tickNumberProcesses[tickNumber]
  if (process) {
    process()
  }

  tickNumber++
}, 1000)
