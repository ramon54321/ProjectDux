import Queue from '@common/game/utils/Queue'
import Manipulation from '@server/game/manipulation'
import '@server/game/socket-events'

import StateManager from '@common/game/state-manager'
import ServerState from '@server/game/state'
import { generateShortId } from '../../../common/game/utils/id'
import Dispatcher from './dispatcher'
import { generateRandomName } from '../../../common/game/utils/names'
import Path from './path'
import { SocketRequestAction } from '@common/game/types/RequestActions'
import Specs from '@common/game/specs'

export const socketRequestActionQueue = new Queue<SocketRequestAction>()

const tickNumberProcesses = {
  1: () => {
    Dispatcher.dispatch(
      StateManager.Actions.spawn(generateShortId(), 'Rifleman', generateRandomName(), 2, {
        x: 0,
        y: 0,
      }),
    )
  },
  2: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    const type = absoluteState.world.units[id].type
    const { speed, turnRadius } = Specs.getSpecs(type)
    const acceleration = 0.28 // From specs
    const deceleration = 3 // From specs
    const timestamp = Date.now()
    const waypoints = Path.create(
      speed,
      turnRadius,
      acceleration,
      deceleration,
    ).map(waypoint => ({
      ...waypoint,
      timestamp: waypoint.timestamp * 1000 + timestamp,
    }))
    Dispatcher.dispatch(StateManager.Actions.setWaypoints(id, waypoints))
  },
  22: () => {
    // const absoluteState = ServerState.getAbsoluteState()
    // const id = Object.keys(absoluteState.world.units)[0]
    // Dispatcher.dispatch(CommonState.Actions.destroy(id))
  },
}

// TODO: Refactor requestActions to have access to state

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
