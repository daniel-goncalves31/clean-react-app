import { database, random } from 'faker'
import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { CompareFieldsValidation } from './CompareFieldsValidatio'

interface SutType {
  sut: CompareFieldsValidation
}

const field = database.column()
const valueToCompare = random.word()

const makeSut = (): SutType => {
  const sut = new CompareFieldsValidation(field, valueToCompare)

  return {
    sut
  }
}

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', async () => {
    const { sut } = makeSut()
    const error = sut.validate(random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})
