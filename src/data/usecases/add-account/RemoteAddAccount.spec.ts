import { HttpPostClient, HttpPostParams, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/AccountModel'
import { mockAddAccountParams } from '@/domain/test/mock-add-account'
import { AddAccountParams } from '@/domain/usecases/AddAccountUseCase'
import { internet } from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { RemoteAddAccount } from './RemoteAddAccount'

interface SutType {
  sut: RemoteAddAccount
  httpPostClientStub: MockProxy<HttpPostClient<AddAccountParams, AccountModel>>
}

const url = internet.url()
const addAccountParams = mockAddAccountParams()

const makeSut = (): SutType => {
  const httpPostClientStub = mock<HttpPostClient<AddAccountParams, AccountModel>>()
  httpPostClientStub.post.mockResolvedValue({ statusCode: 1 })

  const sut = new RemoteAddAccount(url, httpPostClientStub)

  return {
    sut,
    httpPostClientStub
  }
}

describe('RemoteAddAccount', () => {
  it('should call HttpPostClient with correct URL and BODY', async () => {
    const { sut, httpPostClientStub } = makeSut()

    await sut.add(addAccountParams)

    expect(httpPostClientStub.post).toHaveBeenCalledWith<[HttpPostParams<AddAccountParams>]>({ url, body: addAccountParams })
    expect(httpPostClientStub.post).toHaveBeenCalledTimes(1)
  })

  it('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValue(Promise.resolve({
      statusCode: HttpStatusCode.FORBIDDEN
    }))

    const promise = sut.add(addAccountParams)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValue(Promise.resolve({
      statusCode: HttpStatusCode.BAD_REQUEST
    }))

    const promise = sut.add(addAccountParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValue(Promise.resolve({
      statusCode: HttpStatusCode.NOT_FOUND
    }))

    const promise = sut.add(addAccountParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientStub } = makeSut()
    httpPostClientStub.post.mockReturnValue(Promise.resolve({
      statusCode: HttpStatusCode.SERVER_ERROR
    }))

    const promise = sut.add(addAccountParams)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
