import { getSocketIds } from "./socket"


setInterval(() => {
  console.log('Tick')
  const ids = getSocketIds()
  console.log(ids)
}, 1000)
