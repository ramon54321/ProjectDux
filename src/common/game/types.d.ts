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
  type WaypointType = 'Point' | 'Radial'
  export type Waypoint = Timestamped<Vector2> & {
    type: WaypointType
    radius?: number
    angleStart?: number
    angleEnd?: number
    pivotX?: number
    pivotY?: number
  }
}
