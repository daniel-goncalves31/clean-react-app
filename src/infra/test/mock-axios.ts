import { mockPostResponse } from '@/data/test/mock-http-post'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockPostResponse)
  return mockedAxios
}
