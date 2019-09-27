import { addSocket, Socket } from '../model/sockets'
import { EventEmitter } from 'events'
import { generateId } from '../utils/id'

const router = require('express').Router()

router.ws('/', (webSocket, req) => {
  const socket: Socket = {
    id: generateId(),
    events: new EventEmitter(),
    send: webSocket.send.bind(webSocket),
  }
  webSocket.on('close', () => socket.events.emit('close'))
  webSocket.on('message', message => socket.events.emit('message', message))
  addSocket(socket)
})

export default router
