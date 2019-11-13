import Queue from '@common/game/utils/Queue'
import Manipulation from '@server/game/manipulation'
import '@server/game/socket-events'

import CommonState from '@common/game/state'
import ServerState from '@server/game/state'
import { generateShortId } from '../../../common/game/utils/id'
import Dispatcher from './dispatcher'
import { generateRandomName } from '../../../common/game/utils/names'
import Path from './path'
import { SocketRequestAction } from '@common/game/types/RequestActions'
import Specs from '@common/game/specs'

export const socketRequestActionQueue = new Queue<SocketRequestAction>()

const tickNumberProcesses = {
  3: () => {
    Dispatcher.dispatch(
      CommonState.Actions.spawn(generateShortId(), 'Rifleman', generateRandomName(), 2, {
        x: 0,
        y: 0,
      }),
    )
    Dispatcher.dispatch(
      CommonState.Actions.spawn(generateShortId(), 'Rifleman', generateRandomName(), 1, {
        x: 0,
        y: 0,
      }),
    )
    Dispatcher.dispatch(
      CommonState.Actions.spawn(generateShortId(), 'Rifleman', generateRandomName(), 4, {
        x: 0,
        y: 0,
      }),
    )
  },
  6: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[0]
    const type = absoluteState.world.units[id].type
    const { speed, turnRadius } = Specs.getSpecs(type)
    const timestamp = Date.now()
    const waypoints = Path.pointsToWaypoints(
      [
        {
          x: 0,
          y: 10,
        },
        {
          x: 50,
          y: 10,
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
      ],
      speed,
      turnRadius,
    ).map(waypoint => ({
      ...waypoint,
      timestamp: waypoint.timestamp * 1000 + timestamp,
    }))
    Dispatcher.dispatch(CommonState.Actions.setWaypoints(id, waypoints))
  },
  8: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[1]
    const type = absoluteState.world.units[id].type
    const { speed, turnRadius } = Specs.getSpecs(type)
    const timestamp = Date.now()
    const waypoints = Path.pointsToWaypoints(
      [
        {
          x: 140,
          y: 80,
        },
        {
          x: 100,
          y: 100,
        },
        {
          x: 60,
          y: 100,
        },
      ],
      speed,
      turnRadius,
    ).map(waypoint => ({
      ...waypoint,
      timestamp: waypoint.timestamp * 1000 + timestamp,
    }))
    Dispatcher.dispatch(CommonState.Actions.setWaypoints(id, waypoints))
  },
  9: () => {
    const absoluteState = ServerState.getAbsoluteState()
    const id = Object.keys(absoluteState.world.units)[2]
    const type = absoluteState.world.units[id].type
    const { speed, turnRadius } = Specs.getSpecs(type)
    const timestamp = Date.now()
    const waypoints = Path.pointsToWaypoints(
      [
        {
          x: 90,
          y: 80,
        },
        {
          x: 60,
          y: 5,
        },
        {
          x: 30,
          y: 5,
        },
      ],
      speed,
      turnRadius,
    ).map(waypoint => ({
      ...waypoint,
      timestamp: waypoint.timestamp * 1000 + timestamp,
    }))
    Dispatcher.dispatch(CommonState.Actions.setWaypoints(id, waypoints))
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
