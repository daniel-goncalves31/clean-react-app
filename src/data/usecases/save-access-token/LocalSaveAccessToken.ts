import { SetStorage } from '@/data/protocols/cache/SetStorage'
import { SaveAccessTokenUseCase } from '@/domain/usecases/SaveAccessTokenUseCase'

export class LocalSaveAccessToken implements SaveAccessTokenUseCase {
  constructor(private readonly setStorage: SetStorage) { }
  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
