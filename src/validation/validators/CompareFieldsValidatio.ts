import { InvalidFieldError } from '../errors/InvalidFIeldError'
import { FieldValidation } from '../protocols/FieldValidation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) { }

  validate(value: string): Error {
    if (value !== this.valueToCompare) {
      return new InvalidFieldError()
    }
    return null
  }
}
