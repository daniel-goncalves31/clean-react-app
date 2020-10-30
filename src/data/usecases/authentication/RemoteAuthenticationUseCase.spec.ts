import { RemoteAuthenticationUseCase } from './RemoteAuthenticationUseCase'
import { mock, MockProxy } from 'jest-mock-extended'
import { HttpPostClient } from 'data/protocols/HttpPostClient'
import faker from 'faker'

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

    expect(httpPostClientStub.post).toHaveBeenCalledWith(fakeUrl)
    expect(httpPostClientStub.post).toHaveBeenCalledTimes(1)
  })
})
