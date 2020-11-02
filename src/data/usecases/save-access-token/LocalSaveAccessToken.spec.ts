import { SetStorage } from '@/data/protocols/cache/SetStorage'
import { random } from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { LocalSaveAccessToken } from './LocalSaveAccessToken'

interface SutType {
  sut: LocalSaveAccessToken
  setStorageStub: MockProxy<SetStorage>
}

const accessToken = random.uuid()

const makeSut = (): SutType => {
  const setStorageStub = mock<SetStorage>()

  const sut = new LocalSaveAccessToken(setStorageStub)

  return {
    sut,
    setStorageStub
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct value', async () => {
    const { sut, setStorageStub } = makeSut()

    await sut.save(accessToken)

    expect(setStorageStub.set).toHaveBeenCalledWith('accessToken', accessToken)
    expect(setStorageStub.set).toHaveBeenCalledTimes(1)
  })
})
