declare namespace Game {
  export interface RequestActionPayloads {
    log: {
      message: string
    }
  }
  type ActionTypes = keyof RequestActionPayloads
  export type RequestAction<T extends ActionTypes> = T extends ActionTypes
    ? {
        type: T
        payload: RequestActionPayloads[T]
      }
    : never
  export type AnyRequestAction = RequestAction<ActionTypes>
  export interface SocketRequestAction {
    id: string
    requestAction: AnyRequestAction
  }

  export namespace State {
    export type Timestamped<T> = {
      [P in keyof T]: T[P]
    } & {
      timestamp: number
    }
    export interface Vector2 {
      x: number
      y: number
    }
    export interface Unit {
      id: string
      name: string
      level: number
      waypoints: Timestamped<Vector2>[]
    }
  }

  export interface Reducer {
    world: {
      units: any[]
    }
  }
}
