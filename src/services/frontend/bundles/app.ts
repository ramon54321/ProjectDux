import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../components/App'

console.log('This is on the frontend')

const initialProps = (window as any).__PRELOADED_STATE__

console.log(initialProps)

ReactDOM.hydrate(
  React.createElement(App, initialProps),
  document.getElementById('reactroot'),
)
