import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'

interface SutType {
  sut: ValidationComposite
}

const makeSut = (): SutType => {
  const sut = makeLoginValidation()

  return {
    sut
  }
}

describe('login-factory', () => {
  it('should make ValidationComposite with correct Validations', async () => {
    const { sut } = makeSut()
    expect(sut).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
