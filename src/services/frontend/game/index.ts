import * as React from 'react'
import * as ReactDOM from 'react-dom'
import socket from '@frontend/common/socket'
import App from '@frontend/game/components/App'
import getStore from '@frontend/game/model/state/store'
import { getAbsoluteState } from '@common/game/model/state/processor'

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
