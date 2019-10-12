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
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
    this.state = {} as AppState
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
          <button
            onClick={() =>
              Dispatcher.dispatch(
                RequestActions.moveTo(firstId, {
                  x: 30,
                  y: 25,
                }),
              )
            }
          >
            Move
          </button>
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
