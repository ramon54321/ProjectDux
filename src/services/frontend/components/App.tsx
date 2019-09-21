import * as React from 'react'

export interface AppProps {
  // bundlePath: string
}

export default class App extends React.Component<AppProps> {
  render() {
    return (
      <React.Fragment>
        <div>Hello from Class</div>
      </React.Fragment>
    )
  }
}
