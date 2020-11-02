import { SetStorage } from '@/data/protocols/cache/SetStorage'

export class LocalStorageAdapter implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
