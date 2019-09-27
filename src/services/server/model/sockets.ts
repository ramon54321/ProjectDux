import { EventEmitter } from "events"

export interface Socket {
  id: string
  events: EventEmitter
  send: (message: string) => void
}
type SocketMap = { [id: string]: Socket }

export const socketMap: SocketMap = {}

interface SocketEvents {
  open: string
  close: string
  message: {
    id: string
    message: string
  },
}

interface SocketsEventsEmitter<T> {
  on<K extends keyof T>(key: K, listener: (args: T[K]) => void)
  emit<K extends keyof T>(key: K, data?: T[K])
  send: (message: string) => void
}

export const socketEvents = (new EventEmitter() as any) as SocketsEventsEmitter<SocketEvents>

/***
 * Ping checking
 *
 * In order for a socket to be considered active, it must answer pings.
 *
 * If a socket fails to answer a ping, the socket is considered inactive and is removed.
 */
// const respondedPings = []
// setInterval(pingSockets, 5000)
// function pingSockets() {
//   respondedPings.length = 0
// }

export function addSocket(socket: Socket) {
  socketMap[socket.id] = socket
  socket.events.on('close', () => removeSocketById(socket.id))
  socket.events.on('close', () => socketEvents.emit('close', socket.id))
  socket.events.on('message', message => socketEvents.emit('message', {
    id: socket.id,
    message: message,
  }))
  socketEvents.emit('open', socket.id)
}

function removeSocketById(id: string) {
  delete socketMap[id]
}

function getSocketById(id: string): Socket {
  return socketMap[id]
}

export function getSocketIds(): string[] {
  const ids = []
  for(const prop in socketMap) {
    ids.push(prop)
  }
  return ids
}

export function send(id: string, message: string): boolean {
  const socket = getSocketById(id)
  if (!socket) {
    return false
  }
  socket.send(message)
  return true
}

export function broadcast(message: string) {
  const ids = getSocketIds()
  const sockets = ids.map(id => getSocketById(id))
  sockets.forEach(socket => {
    if (!socket) {
      return
    }
    socket.send(message)
  })
}
