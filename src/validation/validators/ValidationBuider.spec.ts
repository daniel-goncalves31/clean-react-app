import { random } from 'faker'
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
})
