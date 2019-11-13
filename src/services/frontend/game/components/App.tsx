import * as React from 'react'
import * as R from 'ramda'
import { State } from '@common/game/types/State'
import { Vector2 } from '@common/game/types/Vector'
import { InterfaceEventEmitter } from '@frontend/game/types/Events'
import RequestActions from '@frontend/game/request-actions'
import Dispatcher from '@frontend/game/dispatcher'
import ClientState from '@frontend/game/state'

export interface AppProps {
  interfaceEvents: InterfaceEventEmitter
}

export interface AppState {
  discreetState: State<'Discreet'>
  absoluteState: State<'Absolute'>
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
        },
      },
    } as AppState

    this.props.interfaceEvents &&
      this.props.interfaceEvents.on('tick_ui', uiState => {
        this.setState({
          viewState: {
            mouseWorldPosition: uiState.mouseWorldPosition,
          },
        })
      })

    this.handleChangeX = this.handleChangeX.bind(this)
    this.handleChangeY = this.handleChangeY.bind(this)
  }

  setDiscreetState(discreetState: State<'Discreet'>) {
    this.setState({
      discreetState: discreetState,
    })
  }
  setAbsoluteState(absoluteState: State<'Absolute'>) {
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
    const units = R.path(['world', 'units'], ClientState.getModelStore().getState())
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
              MouseX: {this.state.viewState.mouseWorldPosition.x}
              <br />
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
