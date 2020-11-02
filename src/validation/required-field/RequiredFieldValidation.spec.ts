import { random } from 'faker'
import { RequiredFieldError } from '../errors'
import { RequiredFieldValidation } from './RequiredFieldValidation'

interface SutType {
  sut: RequiredFieldValidation
}

const validValue = random.words(4)

const makeSut = (): SutType => {
  const sut = new RequiredFieldValidation('email')

  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', async () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return null if field is not empty', async () => {
    const { sut } = makeSut()
    const error = sut.validate(validValue)
    expect(error).toBeFalsy()
  })
})
