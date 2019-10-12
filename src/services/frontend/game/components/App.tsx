import * as React from 'react'
import * as R from 'ramda'
import RequestActions from '@frontend/game/request-actions'
import Dispatcher from '@frontend/game/dispatcher'
import State from '@frontend/game/state'
import { DiscreetState, AbsoluteState } from '@common/game/types/State'

export interface AppProps {}

export interface AppState {
  discreetState: DiscreetState
  absoluteState: AbsoluteState
  x: number
  y: number
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
    this.state = {} as AppState

    this.handleChangeX = this.handleChangeX.bind(this)
    this.handleChangeY = this.handleChangeY.bind(this)
  }

  setDiscreetState(discreetState: DiscreetState) {
    this.setState({
      discreetState: discreetState,
    })
  }
  setAbsoluteState(absoluteState: AbsoluteState) {
    this.setState({
      absoluteState: absoluteState,
    })
  }

  handleChangeX(event) {
    this.setState({ x: event.target.value })
  }
  handleChangeY(event) {
    this.setState({ y: event.target.value })
  }

  render() {
    const units = R.path(['world', 'units'], State.getStore().getState())
    const keys = R.keys(units)
    const firstId = R.prop(0, keys)

    return (
      <React.Fragment>
        <button
          onClick={() => Dispatcher.dispatch(RequestActions.log('Major Tom'))}
        >
          Send Log
        </button>
        {firstId && (
          <React.Fragment>
            <input type="number" onChange={this.handleChangeX}></input>
            <input type="number" onChange={this.handleChangeY}></input>
            <button
              onClick={() =>
                Dispatcher.dispatch(
                  RequestActions.moveTo(firstId, {
                    x: this.state.x,
                    y: this.state.y,
                  }),
                )
              }
            >
              Move
            </button>
          </React.Fragment>
        )}
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
