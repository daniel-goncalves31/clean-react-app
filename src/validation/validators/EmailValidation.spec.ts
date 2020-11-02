import { internet } from 'faker'
import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { EmailValidation } from './EmailValidation'

interface SutType {
  sut: EmailValidation
}

const email = internet.email()

const makeSut = (): SutType => {
  const sut = new EmailValidation('email')

  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('should return error if email is invalid', async () => {
    const { sut } = makeSut()
    const error = sut.validate('invalid_email')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return null if email is valid', async () => {
    const { sut } = makeSut()
    const error = sut.validate(email)
    expect(error).toBeNull()
  })

  it('should return null if email is empty', async () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toBeNull()
  })
})
