import { AccountModel } from 'domain/models/AccountModel'

type AuthenticationParams = {
  email: string
  password: string
}

export interface AuthenticationUseCase {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
