import { AxiosHttpClient } from './AxiosHttpClient'
import axios from 'axios'
import { mockPostResponse, mockPostRequest } from '@/data/test/mock-http-post'
import { mockAxios } from '@/infra/test/mock-axios'

jest.mock('axios')

interface SutType {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutType => {
  const mockedAxios = mockAxios()
  const sut = new AxiosHttpClient()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', async () => {
    const { sut } = makeSut()
    const request = mockPostRequest()
    const res = await sut.post(request)
    expect(res).toEqual({
      statusCode: mockPostResponse.status,
      body: mockPostResponse.data
    })
  })

  it('should return the correct statusCode and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()

    mockedAxios.post.mockRejectedValueOnce({
      response: mockPostResponse
    })

    const request = mockPostRequest()
    const promise = sut.post(request)

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
