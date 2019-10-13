import { Vector2 } from '@common/game/types/Vector'

interface ClientEvents {
  mousemove: Vector2
}

export interface ClientEventEmitter {
  on: <T extends keyof ClientEvents>(
    event: T,
    action: (payload: ClientEvents[T]) => void,
  ) => void
  emit: <T extends keyof ClientEvents>(
    event: T,
    ...payload: ClientEvents[T] extends void ? [] : [ClientEvents[T]]
  ) => void
}
