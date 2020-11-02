import { AxiosHttpClient } from '@/infra/http/axios-http-client/AxiosHttpClient'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
