import { renderComponentByName } from '../model/components'

const router = require('express').Router()

router.get('/render/:componentName', (req, res) => {
  const componentName: Frontend.Components.Name = req.params.componentName
  const props = req.query
  const html = renderComponentByName(componentName, props)
  return html ? res.send(html) : res.status(404).send()
})

export default router
