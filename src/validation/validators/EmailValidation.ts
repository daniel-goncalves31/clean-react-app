import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { FieldValidation } from '../protocols/FieldValidation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { }
  validate(email: string): Error {
    return new InvalidFieldError()
  }
}
