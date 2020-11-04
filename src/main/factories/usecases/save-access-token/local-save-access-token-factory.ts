import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/LocalSaveAccessToken'
import { SaveAccessTokenUseCase } from '@/domain/usecases/SaveAccessTokenUseCase'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessTokenUseCase => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
