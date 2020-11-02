import { random } from 'faker'
import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { MinLengthValidation } from './MinLengthValidation'

interface SutType {
  sut: MinLengthValidation
}

const field = random.words(2)
const minLength = random.number(2)

const makeSut = (): SutType => {
  const sut = new MinLengthValidation(field, minLength)

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
})
