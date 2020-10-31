import { AxiosHttpClient } from './AxiosHttpClient'
import axios from 'axios'
import { internet } from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

interface SutType {
  sut: AxiosHttpClient
}

const url = internet.url()

const makeSut = (): SutType => {
  const sut = new AxiosHttpClient()

  return {
    sut
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct url and verb', async () => {
    const { sut } = makeSut()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
