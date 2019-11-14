import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { State } from '@common/game/types/State'
import StateManager from '@common/game/state-manager'
import socket from '@frontend/common/socket'
import App from '@frontend/game/components/App'
import FrontendState from '@frontend/game/state'
import IO from '@frontend/game/io'

const initialProps = (window as any).__PRELOADED_STATE__

socket.on('open', () => {
  console.log('Connected to server')
})

socket.on('message', message => {
  const action = JSON.parse(message)
  if (action.type === 'fullState') {
    FrontendState.getModelStore(action.payload)
  } else {
    FrontendState.getModelStore().dispatch(action)
  }
  console.log(action)
})

initialProps.interfaceEvents = IO.interfaceEvents

const app = ReactDOM.hydrate(
  React.createElement(App, initialProps),
  document.getElementById('reactroot'),
)

function tick() {
  const continuousState: State<'Continuous'> = FrontendState.getModelStore().getState()
  const absoluteState: State<'Absolute'> = StateManager.Processor.getAbsoluteState(
    continuousState,
  )

  app.setContinuousState(continuousState)
  app.setAbsoluteState(absoluteState)

  IO.controller.render(continuousState, absoluteState)

  window.requestAnimationFrame(tick)
}
window.requestAnimationFrame(tick)
