import './controller/socketEvents'

import { spawn, setWaypoints } from '../../../common/game/model/actions'
import { generateShortId } from '../utils/id'
import { dispatch } from './model/store'
import Queue from '../utils/queue'

function applySocketRequestAction(socketRequestAction: Game.SocketRequestAction) {
  if (socketRequestAction.requestAction.type === 'log') {
    console.log('Client Log:', socketRequestAction.requestAction.payload.message)
  }
}

export const socketRequestActionQueue = new Queue<Game.SocketRequestAction>()

const testvars: any = {}

const tickNumberProcesses = {
  5: () => {
    testvars.jimmyId = generateShortId()
    dispatch(spawn(testvars.jimmyId, 'Jimmy', 4))
  },
  8: () => {
    const timestamp = Date.now()
    dispatch(setWaypoints(testvars.jimmyId, [
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
    ]))
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


