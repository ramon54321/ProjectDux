import { Vector2 } from "./Vector"

export interface RequestActionCreators {
  log: (message: string) => RequestAction<'log'>
  moveTo: (id: string, target: Vector2) => RequestAction<'moveTo'>
}

interface RequestActionPayloads {
  log: {
    message: string
  }
  moveTo: {
    id: string
    target: Vector2
  }
}

type RequestActionTypes = keyof RequestActionPayloads
export type RequestAction<
  T extends RequestActionTypes
> = T extends RequestActionTypes
  ? {
      type: T
      payload: RequestActionPayloads[T]
    }
  : never
export type AnyRequestAction = RequestAction<RequestActionTypes>
export interface SocketRequestAction {
  id: string
  requestAction: AnyRequestAction
}
export type RequestActionMap = {
  [P in keyof RequestActionPayloads]: RequestActionCreators[P]
}
export type RequestReactionMap = {
  [P in keyof RequestActionPayloads]: (socketId: string, payload: RequestActionPayloads[P]) => any
}
