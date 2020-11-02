import { random } from 'faker'
import { EmailValidation } from './EmailValidation'
import { MinLengthValidation } from './MinLengthValidation'
import { RequiredFieldValidation } from './RequiredFieldValidation'
import { ValidationBuilder } from './ValidationBuilder'

interface SutType {
  sut: ValidationBuilder
}

const field = random.word()
const makeSut = (): SutType => {
  const sut = ValidationBuilder.field(field)

  return {
    sut
  }
}

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', async () => {
    const { sut } = makeSut()
    const validations = sut.required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidation', async () => {
    const { sut } = makeSut()
    const validations = sut.email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  it('should return MinLengthValidation', async () => {
    const { sut } = makeSut()
    const minLength = 1
    const validations = sut.min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(field, minLength)])
  })
})
