import { RemoteAuthenticationUseCase } from '@/data/usecases/authentication/RemoteAuthenticationUseCase'
import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeRemoteAuthentication = (): AuthenticationUseCase => {
  return new RemoteAuthenticationUseCase(makeApiUrl('login'), makeAxiosHttpClient())
}
