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
const error1 = new Error(random.words(3))
const error2 = new Error(random.words(3))

const makeSut = (): SutType => {
  const validationStub1 = mock<FieldValidation>({ field })
  validationStub1.validate.mockReturnValue(null)
  const validationStub2 = mock<FieldValidation>({ field })
  validationStub2.validate.mockReturnValue(null)

  const validatorsStub = [validationStub1, validationStub2]

  const sut = ValidationComposite.build(validatorsStub)

  return {
    sut,
    validationStub1,
    validationStub2
  }
}

describe('ValidationComposite', () => {
  it('should return error if any Validation fails', async () => {
    const { sut, validationStub1, validationStub2 } = makeSut()
    validationStub1.validate.mockReturnValueOnce(error1)
    validationStub2.validate.mockReturnValueOnce(error2)

    const res = sut.validate(field, value)
    expect(res).toEqual(error1.message)
  })

  it('should return null if there is no error', async () => {
    const { sut } = makeSut()

    const res = sut.validate(field, value)
    expect(res).toBeNull()
  })
})
