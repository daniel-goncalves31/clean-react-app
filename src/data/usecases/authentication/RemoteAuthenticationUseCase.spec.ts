import { internet } from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { RemoteAuthenticationUseCase } from './RemoteAuthenticationUseCase'
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/HttpPostClient'
import { mockAuthenticationParams } from '@/domain/test/mock-authentication'
import { HttpStatusCode } from '@/data/protocols/http/HttpResponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'

interface SutType {
  sut: RemoteAuthenticationUseCase
  httpPostClientStub: MockProxy<HttpPostClient>
}

const authenticationParams = mockAuthenticationParams()
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
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.NO_CONTENT }))

    await sut.auth(authenticationParams)

    expect(httpPostClientStub.post).toHaveBeenCalledWith<[HttpPostParams]>({ url: fakeUrl, body: authenticationParams })
    expect(httpPostClientStub.post).toHaveBeenCalledTimes(1)
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.UNAUTHORIZED }))

    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
