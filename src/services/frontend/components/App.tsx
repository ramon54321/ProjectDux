import * as React from 'react'
import RequestActions from '../game/model/request-actions/requestActions'
import { dispatch } from '../game/connectors/dispatcher'

export interface AppProps {
  age: number
}

export interface AppState {
  discreetState: Game.DiscreetState.DiscreetState
  absoluteState: Game.AbsoluteState.AbsoluteState
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
    this.state = {} as AppState
  }
  refresh() {
    console.log('Refreshing UI')
    this.forceUpdate()
  }
  setDiscreetState(discreetState: Game.DiscreetState.DiscreetState) {
    this.setState({
      discreetState: discreetState,
    })
  }
  setAbsoluteState(absoluteState: Game.AbsoluteState.AbsoluteState) {
    this.setState({
      absoluteState: absoluteState,
    })
  }
  render() {
    return (
      <React.Fragment>
        <div>Hello from Class app of age {this.props.age}</div>
        <button onClick={() => this.refresh()}>Refresh</button>
        <button onClick={() => dispatch(RequestActions.log('Major Tom'))}>Send Log</button>
        <h3>Discreet State</h3>
        <pre>
          <code>{JSON.stringify(this.state.discreetState, null, 2)}</code>
        </pre>
        <h3>Absolute State</h3>
        <pre>
          <code>{JSON.stringify(this.state.absoluteState, null, 2)}</code>
        </pre>
      </React.Fragment>
    )
  }
}
