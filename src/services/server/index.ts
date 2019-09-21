import {
  renderComponentByName,
  getBundleByName,
  getViewByName,
} from './connectors/frontend'

/***
 * This file is the main interface to the outside.
 *
 * During development it will contain testing routes.
 *
 * All other services are internal and can only be called from this service.
 * Communication with internal services is done through files in the 'connectors' folder.
 *
 * Each service follows the general MVC pattern, usually without the View, where
 * Model contains the data and the logic to change the data, while the Controller contains
 * the routes which call the modification functions in the Model.
 *
 * The job of the 'index' file is purly to set up the listener (usually http), and mount
 * the routes from the Controller to the listener.
 */

const app = require('express')()

// Middleware
app.use(require('cookie-parser')())

// Controllers
app.get('/', async (req, res) => {
  const response = await getViewByName('index', {
    name: 'Elizabeth',
    bundle: 'app',
  })
  return response ? res.send(response) : res.status(404).send()
})

app.get('/bundle/:bundleName', async (req, res) => {
  const bundleName = req.params.bundleName
  const response = await getBundleByName(bundleName)
  return response ? res.send(response) : res.status(404).send()
})

// Listen
app.listen(8000)
