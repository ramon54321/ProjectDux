import { socketEvents } from '../../model/sockets'
import { getShortId } from '../../utils/id'
import { dispatchFullStateToSocket } from '../model/store'
import { socketRequestActionQueue } from '..'

socketEvents.on('message', data => {
  const { id, message } = data
  const socketRequestAction: Game.RequestActions.SocketRequestAction = {
    id: id,
    requestAction: JSON.parse(message),
  }
  socketRequestActionQueue.enqueue(socketRequestAction)
})

socketEvents.on('open', id => {
  console.log('Client Connected:', getShortId(id))
  dispatchFullStateToSocket(id)
})

socketEvents.on('close', id => {
  console.log('Client Disconnected:' + getShortId(id))
})
