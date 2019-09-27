const socketRequestActionQueue: Game.SocketRequestAction[] = []

export function enqueue(socketRequestAction: Game.SocketRequestAction) {
  socketRequestActionQueue.push(socketRequestAction)
}

export function dequeue(): Game.SocketRequestAction {
  return socketRequestActionQueue.shift()
}
