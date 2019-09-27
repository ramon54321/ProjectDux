import { socketEvents } from '../../model/sockets'
import { getShortId } from '../../utils/id'
import { enqueue } from '../model/socketRequestActionQueue'
import { dispatchFullStateToSocket } from '../model/store'

socketEvents.on('message', data => {
  const { id, message } = data
  const socketRequestAction: Game.SocketRequestAction = {
    id: id,
    requestAction: JSON.parse(message),
  }
  enqueue(socketRequestAction)
  // console.log(socketRequestAction)
})

socketEvents.on('open', id => {
  console.log('Client Connected:', getShortId(id))
  dispatchFullStateToSocket(id)
})

socketEvents.on('close', id => {
  console.log('Client Disconnected:' + getShortId(id))
})
