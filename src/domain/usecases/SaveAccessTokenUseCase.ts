export interface SaveAccessTokenUseCase {
  save: (accessToken: string) => Promise<void>
}
