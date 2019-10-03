const log = (
  message: string,
): Game.RequestActions.RequestAction<'log'> => ({
  type: 'log',
  payload: {
    message: message,
  }
})

const moveTo = (
  id: string,
  target: Game.Vector2
): Game.RequestActions.RequestAction<'moveTo'> => ({
  type: 'moveTo',
  payload: {
    id: id,
    target: target,
  }
})

const requestActions: Game.RequestActions.RequestActionCreators = {
  log: log,
  moveTo: moveTo,
}

export default requestActions
