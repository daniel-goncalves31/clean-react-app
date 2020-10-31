import { internet } from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { RemoteAuthenticationUseCase } from './RemoteAuthenticationUseCase'
import { HttpPostClient, HttpPostParams } from '@/data/protocols/HttpPostClient'
import { mockAuthenticationParams } from '@/domain/test/mock-authentication'

interface SutType {
  sut: RemoteAuthenticationUseCase
  httpPostClientStub: MockProxy<HttpPostClient>
}

const fakeUrl = internet.url()

const makeSut = (): SutType => {
  const httpPostClientStub = mock<HttpPostClient>()

  const sut = new RemoteAuthenticationUseCase(fakeUrl, httpPostClientStub)

  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAuthenticationUseCase', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const { sut, httpPostClientStub } = makeSut()

    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)

    expect(httpPostClientStub.post).toHaveBeenCalledWith<[HttpPostParams]>({ url: fakeUrl, body: authenticationParams })
    expect(httpPostClientStub.post).toHaveBeenCalledTimes(1)
  })
})
