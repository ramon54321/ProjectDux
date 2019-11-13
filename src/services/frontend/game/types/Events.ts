interface InterfaceEvents {
  tick_ui: any
}

export interface InterfaceEventEmitter {
  on: <T extends keyof InterfaceEvents>(
    event: T,
    action: (payload: InterfaceEvents[T]) => void,
  ) => void
  emit: <T extends keyof InterfaceEvents>(
    event: T,
    ...payload: InterfaceEvents[T] extends void ? [] : [InterfaceEvents[T]]
  ) => void
}
