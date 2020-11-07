import React from 'react'
import SignUp from './SignUp'
import { RenderResult, render, fireEvent } from '@testing-library/react'
import * as TestFormHelper from '@/presentation/test/FormHelper'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validation } from '@/presentation/protocols/Validation'
import { random } from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: MockProxy<Validation>
}

const validationError = 'Required Field'
const value = random.word()

const makeSut = (): SutTypes => {
  const validationStub = mock<Validation>()
  validationStub.validate.mockReturnValue(validationError)

  const sut = render(
    <SignUp validation={validationStub} />
  )
  return {
    sut,
    validationStub
  }
}

const populateField = (sut: RenderResult, filedName: string, value: string): void => {
  const input = sut.getByTestId(filedName) as HTMLInputElement
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut()
    TestFormHelper.testChildCount(sut, 'error-wrap', 0)
    TestFormHelper.testButtonIsDisabled(sut, 'submit', true)
    TestFormHelper.testStatusForField(sut, 'name', validationError)
    TestFormHelper.testStatusForField(sut, 'email', validationError)
    TestFormHelper.testStatusForField(sut, 'password', validationError)
    TestFormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  describe('Validation', () => {
    it('should show name error if Validation fails', async () => {
      const { sut } = makeSut()
      populateField(sut, 'name', value)
      TestFormHelper.testStatusForField(sut, 'name', validationError)
    })
  })
})
