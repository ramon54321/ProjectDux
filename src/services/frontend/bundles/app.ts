import * as React from 'react'
import * as ReactDOM from 'react-dom'
import socket from '../common/socket'
import getStore from '../game/store'

// UI After Connection
import App from '../components/App'

const initialProps = (window as any).__PRELOADED_STATE__

const app = ReactDOM.hydrate(
  React.createElement(App, initialProps),
  document.getElementById('reactroot'),
)

socket.on('open', () => {
  console.log('Connected to server')
})

socket.on('message', message => {
  const action = JSON.parse(message)
  if (action.type === 'full_state') {
    getStore(action.payload)
  } else {
    getStore().dispatch(action)
  }
  app.refresh()
  console.log(action)
})
