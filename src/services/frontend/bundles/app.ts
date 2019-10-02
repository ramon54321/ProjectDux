import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../components/App'
import socket from '../common/socket'
import getStore from '../game/store'
import { getAbsoluteState } from '../../../common/game/model/state/processor'

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
  if (action.type === 'fullState') {
    getStore(action.payload)
  } else {
    getStore().dispatch(action)
  }
  app.refresh()
  console.log(action)
})

function tick() {
  const discreetState: Game.DiscreetState.DiscreetState = getStore().getState()
  const absoluteState: Game.AbsoluteState.AbsoluteState = getAbsoluteState(discreetState)

  app.setDiscreetState(discreetState)
  app.setAbsoluteState(absoluteState)

  window.requestAnimationFrame(tick)
}
window.requestAnimationFrame(tick)
