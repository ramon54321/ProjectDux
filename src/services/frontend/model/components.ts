import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import App from '../game/components/App'

type Component = ((props: any) => any) | React.ComponentClass
type ComponentNameMap = { [key in Frontend.Components.Name]: Component }

const componentsByName: ComponentNameMap = {
  App: App,
  Welcome: props => React.createElement('h3', props, `Hello, ${props.name}!`),
  NotFound: _ => React.createElement('h2', null, `404`),
}

export function renderComponentByName(
  componentName: Frontend.Components.Name,
  props,
): string {
  const component = componentsByName[componentName]
  return component ? ReactDOMServer.renderToString(React.createElement(component, props)) : undefined
}
