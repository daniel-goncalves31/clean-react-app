import { internet } from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { RemoteAuthenticationUseCase } from './RemoteAuthenticationUseCase'
import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/HttpPostClient'
import { mockAccountModel, mockAuthenticationParams } from '@/domain/test/mock-account'
import { HttpStatusCode } from '@/data/protocols/http/HttpResponse'
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError'
import { UnexpectedError } from '@/domain/errors/UnexpectedError'
import { AuthenticationParams } from '@/domain/usecases/AuthenticationUseCase'
import { AccountModel } from '@/domain/models/AccountModel'

interface SutType {
  sut: RemoteAuthenticationUseCase
  httpPostClientStub: MockProxy<HttpPostClient<AuthenticationParams, AccountModel>>
}

const authenticationParams = mockAuthenticationParams()
const accountModel = mockAccountModel()
const fakeUrl = internet.url()

const makeSut = (): SutType => {
  const httpPostClientStub = mock<HttpPostClient<AuthenticationParams, AccountModel>>()

  const sut = new RemoteAuthenticationUseCase(fakeUrl, httpPostClientStub)

  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAuthenticationUseCase', () => {
  it('should call HttpPostClient with correct URL and body', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: 1 }))

    await sut.auth(authenticationParams)

    expect(httpPostClientStub.post).toHaveBeenCalledWith<[HttpPostParams<AuthenticationParams>]>({ url: fakeUrl, body: authenticationParams })
    expect(httpPostClientStub.post).toHaveBeenCalledTimes(1)
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.UNATHORIZED }))

    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttPostClient returns 400', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.BAD_REQUEST }))

    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttPostClient returns 404', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.NOT_FOUND }))

    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttPostClient returns 500', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.SERVER_ERROR }))

    const promise = sut.auth(authenticationParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an AccountModel on success', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValueOnce(Promise.resolve({ statusCode: HttpStatusCode.OK, body: accountModel }))

    const res = await sut.auth(authenticationParams)
    expect(res).toEqual(accountModel)
  })
})
