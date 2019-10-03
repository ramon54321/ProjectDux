const log = (
  message: string,
): Game.RequestActions.RequestAction<'log'> => ({
  type: 'log',
  payload: {
    message: message,
  }
})

const requestActions: Game.RequestActions.RequestActionCreators = {
  log: log,
}

export default requestActions
