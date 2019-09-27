import './controller/socketEvents'

import { spawn, setPosition } from '../../../common/game/model/actions'
import { generateShortId } from '../utils/id'
import { dispatch } from './model/store'
import { dequeue } from './model/socketRequestActionQueue'

function applySocketRequestAction(socketRequestAction: Game.SocketRequestAction) {
  if (socketRequestAction.requestAction.type === 'log') {
    console.log('Client Log:', socketRequestAction.requestAction.payload.message)
  }
}

const store: any = {}

const tickNumberProcesses = {
  5: () => {
    store.jimmyId = generateShortId()
    dispatch(spawn(store.jimmyId, 'Jimmy', 4))
  },
  8: () => {
    dispatch(setPosition(store.jimmyId, 7, 9))
  },
}

let tickNumber = 0
setInterval(() => {
  console.log('Tick:', tickNumber)

  // Process Requests
  let socketRequestAction = dequeue()
  while (socketRequestAction) {
    applySocketRequestAction(socketRequestAction)
    socketRequestAction = dequeue()
  }

  // Process Model
  const process = tickNumberProcesses[tickNumber]
  if (process) {
    process()
  }

  tickNumber++
}, 1000)
