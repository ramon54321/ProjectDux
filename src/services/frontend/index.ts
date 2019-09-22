import { HOST_SERVER } from '../../common/constants'
import * as Handlebars from 'handlebars'
import routerBundle from './controller/bundle'
import routerComponents from './controller/components'
import routerViews from './controller/views'
import * as BodyParser from 'body-parser'

Handlebars.registerHelper('json', object => JSON.stringify(object))

const app = require('express')()

// Middleware
app.use(
  require('cors')({
    origin: HOST_SERVER,
  }),
)
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

// Controllers
app.use(routerBundle)
app.use(routerComponents)
app.use(routerViews)

// Listen
app.listen(8002)
