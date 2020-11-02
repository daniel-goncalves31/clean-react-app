import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { FieldValidation } from '../protocols/FieldValidation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) { }

  validate(value: string): Error {
    return new InvalidFieldError()
  }
}
