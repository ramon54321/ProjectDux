import * as React from 'react'

export interface AppProps {
  age: number
}

export default class App extends React.Component<AppProps> {
  render() {
    return (
      <React.Fragment>
        <div>Hello from Class app of age {this.props.age}</div>
      </React.Fragment>
    )
  }
}
