import { random } from 'faker'
import { EmailValidation } from './EmailValidation'
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
  it('should return RequiredFieldValidator', async () => {
    const { sut } = makeSut()
    const validations = sut.required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidator', async () => {
    const { sut } = makeSut()
    const validations = sut.email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })
})
