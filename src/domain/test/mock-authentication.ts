import { internet } from 'faker'
import { AuthenticationParams } from '../usecases/AuthenticationUseCase'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: internet.email(),
  password: internet.password()
})
