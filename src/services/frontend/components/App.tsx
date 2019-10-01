import * as React from 'react'
import getStore from '../game/store'
import { log } from '../game/connectors/requestActions'
import * as R from 'ramda'

export interface AppProps {
  age: number
}

const inverseLerp = (a: number, b: number, x: number) => (x - a) / (b - a)
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

interface Waypoint {
  timestamp: number
  x: number
  y: number
}

function getPosition(
  waypoints: Waypoint[],
  timestamp: number,
): { x: number; y: number } {
  console.log(waypoints)

  if (waypoints.length === 0) {
    return { x: 0, y: 0 }
  }

  if (waypoints.length === 1) {
    return { x: waypoints[0].x, y: waypoints[0].y }
  }

  const waypointFirstAhead = waypoints.findIndex(
    waypoint => waypoint.timestamp > timestamp,
  )

  // All waypoints are in the past -> Return last waypoint
  if (waypointFirstAhead < 0) {
    const waypoint = waypoints[waypoints.length - 1]
    return { x: waypoint.x, y: waypoint.y }
  }

  // First waypoint is in the future -> Return first waypoint
  if (waypointFirstAhead === 0) {
    const waypoint = waypoints[0]
    return { x: waypoint.x, y: waypoint.y }
  }

  const waypointA = waypoints[waypointFirstAhead - 1]
  const waypointB = waypoints[waypointFirstAhead]

  // Timestamp is somewhere between two waypoints
  const t = inverseLerp(waypointA.timestamp, waypointB.timestamp, timestamp)
  const ix = lerp(waypointA.x, waypointB.x, t)
  const iy = lerp(waypointA.y, waypointB.y, t)

  return { x: ix, y: iy }
}

export default class App extends React.Component<AppProps> {
  refresh() {
    console.log('Refreshing UI')
    this.forceUpdate()
  }
  componentDidMount() {
    setInterval(() => this.refresh(), 50)
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
        <pre>
          <code>
            {JSON.stringify(
              getPosition(getStore().getState().world.units[0] ? getStore().getState().world.units[0].waypoints : [], Date.now()),
              null,
              2,
            )}
          </code>
        </pre>
      </React.Fragment>
    )
  }
}
