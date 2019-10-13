import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DiscreetState, AbsoluteState } from '@common/game/types/State'
import CommonState from '@common/game/state'
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

initialProps.events = IO.events

const app = ReactDOM.hydrate(
  React.createElement(App, initialProps),
  document.getElementById('reactroot'),
)

function tick() {
  const discreetState: DiscreetState = FrontendState.getModelStore().getState()
  const absoluteState: AbsoluteState = CommonState.Processor.getAbsoluteState(
    discreetState,
  )

  app.setDiscreetState(discreetState)
  app.setAbsoluteState(absoluteState)

  IO.render(discreetState, absoluteState)

  window.requestAnimationFrame(tick)
}
window.requestAnimationFrame(tick)
