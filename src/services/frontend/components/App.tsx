import * as React from 'react'
import store from '../../../common/store/model/store'
import * as Actions from '../../../common/store/model/actions'

export interface AppProps {
  age: number
}

export default class App extends React.Component<AppProps> {
  spawn() {
    store.dispatch(Actions.spawn('Jeff', 7))
    this.forceUpdate()
  }
  render() {
    return (
      <React.Fragment>
        <div>Hello from Class app of age {this.props.age}</div>
        <button onClick={() => this.spawn()}>Spawn</button>
        <pre>
          <code>
            {JSON.stringify(store.getState(), null, 2)}
          </code>
        </pre>
      </React.Fragment>
    )
  }
}
