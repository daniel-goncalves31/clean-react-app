import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { EmailValidation } from './EmailValidation'

interface SutType {
  sut: EmailValidation
}

const makeSut = (): SutType => {
  const sut = new EmailValidation('email')

  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('should return error if email is invalid', async () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
