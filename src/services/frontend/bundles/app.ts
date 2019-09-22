import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../components/App'
import socket from '../common/socket'

const initialProps = (window as any).__PRELOADED_STATE__

socket.on('open', () => {
  console.log('Connected to server')
  socket.send('Hello!')
})

socket.on('message', message => {
  console.log('Message: ' + message)
})

ReactDOM.hydrate(
  React.createElement(App, initialProps),
  document.getElementById('reactroot'),
)
