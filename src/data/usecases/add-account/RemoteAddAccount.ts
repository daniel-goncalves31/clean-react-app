import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/AccountModel'
import { AddAccountUseCase, AddAccountParams } from '@/domain/usecases/AddAccountUseCase'

export class RemoteAddAccount implements AddAccountUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) { }

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.FORBIDDEN:
        throw new EmailInUseError()
      default:
        return null
    }
  }
}
