declare namespace Game {
  export namespace DiscreetState {
    export interface DiscreetState {
      world: {
        units: Unit[]
      }
    }
    export interface Unit {
      id: string
      name: string
      level: number
      waypoints: Waypoint[]
    }
  }

  export namespace AbsoluteState {
    export interface AbsoluteState {
      world: {
        units: Unit[]
      }
    }
    export interface Unit {
      id: string
      name: string
      level: number
      position: Vector2
    }
  }

  export namespace RequestActions {
    export interface RequestActionPayloads {
      log: {
        message: string
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
  }

  export namespace Actions {
    export interface ActionPayloads {
      spawn: {
        id: string
        name: string
        level: number
      }
      setWaypoints: {
        id: string
        waypoints: Waypoint[]
      }
    }
    type ActionTypes = keyof ActionPayloads
    export type Action<T extends ActionTypes> = T extends ActionTypes
      ? {
          type: T
          payload: ActionPayloads[T]
        }
      : never
    export type AnyAction = Action<ActionTypes>
    export type ActionMap = {
      [P in keyof ActionPayloads]: (...args) => Action<P>
    }
    export type ReducerMap = {
      [P in keyof ActionPayloads]: (current: any, payload: ActionPayloads[P]) => any
    }
  }

  export type Timestamped<T> = {
    [P in keyof T]: T[P]
  } & {
    timestamp: number
  }

  export interface Vector2 {
    x: number
    y: number
  }
  export type Waypoint = Timestamped<Vector2>
}
