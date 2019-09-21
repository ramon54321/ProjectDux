import { HOST_SERVER } from '../../common/constants'
import routerBundle from './controller/bundle'
import routerComponents from './controller/components'
import routerViews from './controller/views'

const app = require('express')()

// Middleware
app.use(
  require('cors')({
    origin: HOST_SERVER,
  }),
)

// Controllers
app.use(routerBundle)
app.use(routerComponents)
app.use(routerViews)

// Listen
app.listen(8002)
