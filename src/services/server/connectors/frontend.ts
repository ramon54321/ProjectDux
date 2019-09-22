import axios from 'axios'
import { HOST_FRONTEND } from '../../../common/constants'

export async function getBundleByName(
  bundleName,
): Promise<string> {
  const url = `${HOST_FRONTEND}bundle/${bundleName}`
  return axios
    .get(url)
    .then(res => res.data)
    .catch(_ => console.error(`Unknown bundle requested: ${bundleName}`))
}

export async function renderViewByName(
  viewName: Frontend.Views.Name,
  props: Frontend.Views.Props,
): Promise<string> {
  const url = `${HOST_FRONTEND}view/${viewName}`
  return axios
    .post(url, props)
    .then(res => res.data)
    .catch(_ => console.error(`Unknown view requested: ${viewName}`))
}
