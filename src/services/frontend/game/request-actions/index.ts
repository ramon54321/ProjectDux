import { Vector2 } from '@common/game/types/Vector'
import {
  RequestAction,
  RequestActionCreators,
} from '@common/game/types/RequestActions'

const log = (message: string): RequestAction<'log'> => ({
  type: 'log',
  payload: {
    message: message,
  },
})

const moveTo = (id: string, target: Vector2): RequestAction<'moveTo'> => ({
  type: 'moveTo',
  payload: {
    id: id,
    target: target,
  },
})

const requestActions: RequestActionCreators = {
  log: log,
  moveTo: moveTo,
}

export default requestActions
