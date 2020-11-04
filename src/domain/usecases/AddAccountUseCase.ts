import { AccountModel } from '@/domain/models/AccountModel'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AddAccountUseCase {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
