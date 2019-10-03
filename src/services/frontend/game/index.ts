import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CommonState from '@common/game/state'
import socket from '@frontend/common/socket'
import App from '@frontend/game/components/App'
import FrontendState from '@frontend/game/state'

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
    FrontendState.getStore(action.payload)
  } else {
    FrontendState.getStore().dispatch(action)
  }
  app.refresh()
  console.log(action)
})

function tick() {
  const discreetState: Game.DiscreetState.DiscreetState = FrontendState.getStore().getState()
  const absoluteState: Game.AbsoluteState.AbsoluteState = CommonState.Processor.getAbsoluteState(discreetState)

  app.setDiscreetState(discreetState)
  app.setAbsoluteState(absoluteState)

  window.requestAnimationFrame(tick)
}
window.requestAnimationFrame(tick)
