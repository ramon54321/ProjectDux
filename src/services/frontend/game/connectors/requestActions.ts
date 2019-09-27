import socket from '../../common/socket'

export function log() {
  const requestAction: Game.RequestAction<'log'> = {
    type: 'log',
    payload: {
      message: 'Hello world!',
    },
  }

  socket.send(JSON.stringify(requestAction))
}
