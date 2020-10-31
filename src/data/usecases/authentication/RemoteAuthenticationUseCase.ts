import { HttpPostClient } from '@/data/protocols/http/HttpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/HttpResponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { AccountModel } from '@/domain/models/AccountModel'
import { AuthenticationParams, AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

export class RemoteAuthenticationUseCase implements AuthenticationUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK:
        return httpResponse.body
      case HttpStatusCode.UNATHORIZED:
        throw new InvalidCredentialsError()
      case HttpStatusCode.BAD_REQUEST:
      case HttpStatusCode.NOT_FOUND:
      case HttpStatusCode.SERVER_ERROR:
        throw new UnexpectedError()
      default:
    }
  }
}
