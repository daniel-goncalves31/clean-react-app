import { random } from 'faker'
import { mock, MockProxy } from 'jest-mock-extended'
import { FieldValidation } from '../protocols/FieldValidation'
import { ValidationComposite } from './ValidationComposite'

interface SutType {
  sut: ValidationComposite
  validationStub1: MockProxy<FieldValidation>
  validationStub2: MockProxy<FieldValidation>
}

const field = random.word()
const value = random.words(3)
const error = new Error(random.words(3))

const makeSut = (): SutType => {
  const validationStub1 = mock<FieldValidation>({ field })
  const validationStub2 = mock<FieldValidation>({ field })

  const validatorsStub = [validationStub1, validationStub2]

  const sut = new ValidationComposite(validatorsStub)

  return {
    sut,
    validationStub1,
    validationStub2
  }
}

describe('ValidationComposite', () => {
  it('should return error if ani Validation fails', async () => {
    const { sut, validationStub1 } = makeSut()
    validationStub1.validate.mockReturnValue(error)

    const res = sut.validate(field, value)
    expect(res).toEqual(error.message)
  })
})
