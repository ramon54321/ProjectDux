import * as React from 'react'
import * as R from 'ramda'
import RequestActions from '@frontend/game/request-actions'
import Dispatcher from '@frontend/game/dispatcher'
import State from '@frontend/game/state'
import { DiscreetState, AbsoluteState } from '@common/game/types/State'
// import IO from '@frontend/game/io'
import { Vector2 } from '@common/game/types/Vector'
import { EventEmitter } from 'events'

export interface AppProps {
  events: EventEmitter
}

export interface AppState {
  discreetState: DiscreetState
  absoluteState: AbsoluteState
  viewState: ViewState
  x: number
  y: number
}

export interface ViewState {
  mouseWorldPosition: Vector2
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props)
    this.state = {
      viewState: {
        mouseWorldPosition: {
          x: 0,
          y: 0,
        }
      }
    } as AppState

    this.props.events && this.props.events.on('mousemove', (mouseWorldPosition: Vector2) => {
      this.setState({
        viewState: {
          mouseWorldPosition: mouseWorldPosition,
        }
      })
    })

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
    const units = R.path(['world', 'units'], State.getModelStore().getState())
    const keys = R.keys(units)
    const firstId = R.prop(0, keys)

    return (
      <React.Fragment>
        <button
          onClick={() => Dispatcher.dispatch(RequestActions.log('Major Tom'))}
        >
          Send Log
        </button>
        <div>
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
        </div>
        <div>
          <pre>
            <code>
              MouseX: {this.state.viewState.mouseWorldPosition.x}<br />
              MouseY: {this.state.viewState.mouseWorldPosition.y}
            </code>
          </pre>
        </div>
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
