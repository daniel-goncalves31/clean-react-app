import { AxiosHttpClient } from './AxiosHttpClient'
import axios from 'axios'
import { internet, random } from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

interface SutType {
  sut: AxiosHttpClient
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: internet.url(),
  body: random.objectElement()
})

const makeSut = (): SutType => {
  const sut = new AxiosHttpClient()

  return {
    sut
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct url and verb', async () => {
    const { sut } = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
