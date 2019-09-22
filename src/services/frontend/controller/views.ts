import { resolve } from 'path'
import { readFileSync } from 'fs'
import * as Handlebars from 'handlebars'
import { renderComponentByName } from '../model/components'

const router = require('express').Router()

router.post('/view/:viewName', (req, res) => {
  const viewName: Frontend.Components.Name = req.params.viewName
  const fileContents = readFileSync(
    resolve(__dirname, `../views/${viewName}.hbs`),
  ).toString()
  if (!fileContents) {
    return res.status(404).send()
  }
  const template = Handlebars.compile(fileContents)
  const { bundle, component, initialState } = req.body
  const props = {
    bundle: bundle,
    html: renderComponentByName(component, initialState),
    initialState: initialState,
  }
  const response = template(props)
  return response ? res.send(response) : res.status(400).send()
})

export default router
