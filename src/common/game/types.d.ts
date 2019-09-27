declare namespace Game {
  export interface RequestActionPayloads {
    'log': {
      message: string
    }
  }
  type ActionTypes = keyof RequestActionPayloads
  export type RequestAction<T extends ActionTypes> = T extends ActionTypes ? {
    type: T
    payload: RequestActionPayloads[T]
  } : never
  export type AnyRequestAction = RequestAction<ActionTypes>
  export interface SocketRequestAction {
    id: string
    requestAction: AnyRequestAction
  }
  export interface Reducer {
    world: {
      units: any[]
    }
  }
}
