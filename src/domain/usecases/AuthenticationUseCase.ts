import { AccountModel } from '../models/AccountModel'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface AuthenticationUseCase {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
