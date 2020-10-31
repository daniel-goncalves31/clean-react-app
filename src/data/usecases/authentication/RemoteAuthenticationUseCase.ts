import { HttpPostClient } from '../../../data/protocols/HttpPostClient'
import { AuthenticationParams } from '../../../domain/usecases/AuthenticationUseCase'

export class RemoteAuthenticationUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
