import './controller/socketEvents'

import Actions from '../../../common/game/model/state/actions/actions'
import { generateShortId } from '../utils/id'
import { dispatch, getServerAbsoluteState } from './model/store'
import Queue from '../utils/queue'
import { generateRandomName } from '../utils/names'

function applySocketRequestAction(
  socketRequestAction: Game.RequestActions.SocketRequestAction,
) {
  if (socketRequestAction.requestAction.type === 'log') {
    console.log(
      'Client Log:',
      socketRequestAction.requestAction.payload.message,
    )
  }
}

export const socketRequestActionQueue = new Queue<
  Game.RequestActions.SocketRequestAction
>()

const tickNumberProcesses = {
  5: () => {
    dispatch(
      Actions.spawn(generateShortId(), generateRandomName(), 1, { x: 0, y: 0 }),
    )
  },
  10: () => {
    const absoluteState = getServerAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    const timestamp = Date.now()
    dispatch(
      Actions.setWaypoints(id, [
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
    const absoluteState = getServerAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    dispatch(Actions.destroy(id))
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
