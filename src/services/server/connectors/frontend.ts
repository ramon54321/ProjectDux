import axios from 'axios'
import { HOST_FRONTEND } from '../../../common/constants'

export async function renderComponentByName(
  componentName: Frontend.Components.Name,
  props,
): Promise<string> {
  const params = new URLSearchParams(props).toString()
  const url = `${HOST_FRONTEND}render/${componentName}?${params}`
  return axios
    .get(url)
    .then(res => res.data)
    .catch(_ => console.error(`Unknown component requested: ${componentName}`))
}

export async function getBundleByName(
  bundleName,
): Promise<string> {
  const url = `${HOST_FRONTEND}bundle/${bundleName}`
  return axios
    .get(url)
    .then(res => res.data)
    .catch(_ => console.error(`Unknown bundle requested: ${bundleName}`))
}

export async function getViewByName(
  viewName,
  props,
): Promise<string> {
  const params = new URLSearchParams(props).toString()
  const url = `${HOST_FRONTEND}view/${viewName}?${params}`
  return axios
    .get(url)
    .then(res => res.data)
    .catch(_ => console.error(`Unknown view requested: ${viewName}`))
}
