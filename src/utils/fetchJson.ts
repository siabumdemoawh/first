import axios, { AxiosRequestConfig } from 'axios'

export default async function fetchJson(
  url: string,
  config?: AxiosRequestConfig
) {
  return await axios(url, {
    ...config,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(({ data }) => data)
    .catch(({ response }) => {
      throw new Error(`Server responded with status code ${response.status}`)
    })
}
