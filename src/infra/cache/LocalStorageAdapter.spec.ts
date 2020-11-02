import { database, random } from 'faker'
import { LocalStorageAdapter } from './LocalStorageAdapter'
import 'jest-localstorage-mock'

interface SutType {
  sut: LocalStorageAdapter
}

const key = database.column()
const value = random.word()

const makeSut = (): SutType => {
  const sut = new LocalStorageAdapter()

  return {
    sut
  }
}

describe('LocalStorageAdapter', () => {
  it('should call localStorage with correct values', async () => {
    const { sut } = makeSut()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })
})
