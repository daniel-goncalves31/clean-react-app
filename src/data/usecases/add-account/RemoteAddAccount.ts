import { HttpPostClient } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models/AccountModel'
import { AddAccountUseCase, AddAccountParams } from '@/domain/usecases/AddAccountUseCase'

export class RemoteAddAccount implements AddAccountUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) { }

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return null
  }
}
