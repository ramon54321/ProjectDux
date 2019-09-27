import * as React from 'react'
import getStore from '../game/store'
import { log } from '../game/connectors/requestActions'

export interface AppProps {
  age: number
}

export default class App extends React.Component<AppProps> {
  refresh() {
    console.log('Refreshing UI')
    this.forceUpdate()
  }
  render() {
    return (
      <React.Fragment>
        <div>Hello from Class app of age {this.props.age}</div>
        <button onClick={() => this.refresh()}>Refresh</button>
        <button onClick={() => log()}>Send Log</button>
        <pre>
          <code>{JSON.stringify(getStore().getState(), null, 2)}</code>
        </pre>
      </React.Fragment>
    )
  }
}
