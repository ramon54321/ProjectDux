import { HOST_SERVER_WS } from '../../../common/constants'
import { EventEmitter } from 'events'

interface Events {
  open: void,
  message: string,
}

interface Socket<T> {
  on<K extends keyof T>(key: K, listener: (args: T[K]) => void)
  emit<K extends keyof T>(key: K, data?: T[K])
  send: (message: string) => void
}

const webSocket = typeof window !== 'undefined' ? new WebSocket(HOST_SERVER_WS) : {} as any
const socket = (new EventEmitter() as any) as Socket<Events>

webSocket.onopen = event => {
  socket.emit('open')
}

webSocket.onmessage = message => {
  socket.emit('message', message.data)
}

socket.send = message => {
  webSocket.send(message)
}

export default socket
