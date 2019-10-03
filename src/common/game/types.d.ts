declare namespace Game {
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
