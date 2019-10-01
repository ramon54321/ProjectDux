import './controller/socketEvents'

import Actions from '../../../common/game/model/actions/actions'
import { generateShortId } from '../utils/id'
import { dispatch } from './model/store'
import Queue from '../utils/queue'

function applySocketRequestAction(socketRequestAction: Game.RequestActions.SocketRequestAction) {
  if (socketRequestAction.requestAction.type === 'log') {
    console.log('Client Log:', socketRequestAction.requestAction.payload.message)
  }
}

export const socketRequestActionQueue = new Queue<Game.RequestActions.SocketRequestAction>()

const testvars: any = {}

const tickNumberProcesses = {
  5: () => {
    testvars.jimmyId = generateShortId()
    dispatch(Actions.spawn(testvars.jimmyId, 'Jimmy', 4))
  },
  8: () => {
    const timestamp = Date.now()
    dispatch(Actions.setWaypoints(testvars.jimmyId, [
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
  24: () => {
    const timestamp = Date.now()
    dispatch(Actions.setWaypoints(testvars.jimmyId, [
      {
        timestamp: timestamp,
        x: 10,
        y: 10,
      },
      {
        timestamp: timestamp + 5000,
        x: 4,
        y: 0,
      },
      {
        timestamp: timestamp + 10000,
        x: 5,
        y: 5,
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


