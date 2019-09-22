import * as UUID from 'uuid'
import { addSocket, Socket, removeSocketById } from "../model/socket"
import { EventEmitter } from 'events'

const router = require('express').Router()

router.ws('/', (webSocket, req) => {
  const socket: Socket = {
    id:  UUID.v4(),
    events: new EventEmitter(),
  }
  webSocket.on('close', () => socket.events.emit('close'))
  webSocket.on('message', message => socket.events.emit('message', message))
  socket.events.on('close', () => removeSocketById(socket.id))
  addSocket(socket)
})

export default router
