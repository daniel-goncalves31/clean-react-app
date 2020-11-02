import { random } from 'faker'
import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { MinLengthValidation } from './MinLengthValidation'

interface SutType {
  sut: MinLengthValidation
}

const field = random.word()

const makeSut = (): SutType => {
  const sut = new MinLengthValidation(field, 5)

  return {
    sut
  }
}

describe('MinLengthValidation', () => {
  it('should return an error if value is invalid', async () => {
    const { sut } = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return null if value is valid', async () => {
    const { sut } = makeSut()
    const error = sut.validate('12345')
    expect(error).toBeNull()
  })
})
