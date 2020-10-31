import { internet, random } from 'faker'
import { AccountModel } from '../models/AccountModel'
import { AuthenticationParams } from '../usecases/AuthenticationUseCase'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: internet.email(),
  password: internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: random.uuid()
})
