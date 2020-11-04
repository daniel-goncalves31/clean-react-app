import { HttpPostClient, HttpPostParams } from '@/data/protocols/http'
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
})
