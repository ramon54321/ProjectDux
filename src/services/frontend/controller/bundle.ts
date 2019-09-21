import { resolve } from 'path'
import { readFileSync } from 'fs'

const router = require('express').Router()

router.get('/bundle/:bundleName', (req, res) => {
  const bundleName = req.params.bundleName
  const fileContents = readFileSync(resolve(__dirname, `../bundles/${bundleName}.bundle.js`)).toString()
  return fileContents ? res.send(fileContents) : res.status(404).send()
})

export default router
