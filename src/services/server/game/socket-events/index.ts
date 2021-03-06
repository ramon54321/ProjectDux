import { SocketRequestAction } from '@common/game/types/RequestActions'
import { getShortId } from '@common/game/utils/id'
import { socketEvents } from '@server/model/sockets'
import Dispatcher from '@server/game/dispatcher'
import { socketRequestActionQueue } from '@server/game'

socketEvents.on('message', data => {
  const { id, message } = data
  const socketRequestAction: SocketRequestAction = {
    id: id,
    requestAction: JSON.parse(message),
  }
  socketRequestActionQueue.enqueue(socketRequestAction)
})

socketEvents.on('open', id => {
  console.log('Client Connected:', getShortId(id))
  Dispatcher.dispatchFullStateToSocket(id)
})

socketEvents.on('close', id => {
  console.log('Client Disconnected:' + getShortId(id))
})
