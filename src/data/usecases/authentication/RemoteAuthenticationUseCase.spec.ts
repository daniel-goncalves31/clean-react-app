import { HttpPostClient, HttpPostParams } from 'data/protocols/HttpPostClient'
import { mock, MockProxy } from 'jest-mock-extended'
import faker from 'faker'
import { RemoteAuthenticationUseCase } from './RemoteAuthenticationUseCase'

interface SutType {
  sut: RemoteAuthenticationUseCase
  httpPostClientStub: MockProxy<HttpPostClient>
}

const fakeUrl = faker.internet.url()

const makeSut = (): SutType => {
  const httpPostClientStub = mock<HttpPostClient>()

  const sut = new RemoteAuthenticationUseCase(fakeUrl, httpPostClientStub)

  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAuthenticationUseCase', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientStub } = makeSut()

    await sut.auth()

    expect(httpPostClientStub.post).toHaveBeenCalledWith<[HttpPostParams]>({ url: fakeUrl })
    expect(httpPostClientStub.post).toHaveBeenCalledTimes(1)
  })
})
