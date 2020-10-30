import { HttpPostClient } from 'data/protocols/HttpPostClient'

export class RemoteAuthenticationUseCase {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url)
  }
}
