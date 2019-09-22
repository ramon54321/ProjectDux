import { EventEmitter } from "events"

export interface Socket {
  id: string
  events: EventEmitter
}
type SocketMap = { [id: string]: Socket }

const socketMap: SocketMap = {}

export function addSocket(socket) {
  socketMap[socket.id] = socket
}

export function removeSocketById(id: string) {
  delete socketMap[id]
}

export function getSocketById(id: string): Socket {
  return socketMap[id]
}

export function getSocketIds(): string[] {
  const ids = []
  for(const prop in socketMap) {
    ids.push(prop)
  }
  return ids
}

export default socketMap
