declare namespace Game {
  export namespace DiscreetState {
    export interface DiscreetState {
      world: {
        units: {[key: string]: Unit}
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
        units: {[key: string]: Unit}
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
    export interface ActionCreators {
      spawn: (id: string, name: string, level: number, position: Vector2) => Action<'spawn'>
      destroy: (id: String) => Action<'destroy'>
      setWaypoints: (id: string, waypoints: Waypoint[]) =>  Action<'setWaypoints'>
    }
    export interface ActionPayloads {
      spawn: {
        id: string
        name: string
        level: number
        position: Vector2
      }
      destroy: {
        id: string
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
      [P in keyof ActionPayloads]: ActionCreators[P]
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
