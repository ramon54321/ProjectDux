type ActionType = 'spawn' | 'destroy'
interface Action {
  type: ActionType
  payload: any
}
type ActionCreator = (...args: any[]) => Action

export const spawn: ActionCreator = (name: string, level: number) => ({
  type: 'spawn',
  payload: {
    name: name,
    level: level,
  },
})
