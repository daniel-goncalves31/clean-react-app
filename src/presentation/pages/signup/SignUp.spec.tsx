import React from 'react'
import SignUp from './SignUp'
import { RenderResult, render } from '@testing-library/react'
import * as TestFormHelper from '@/presentation/test/FormHelper'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )
  return {
    sut
  }
}

describe('SignUp Page', () => {
  test('should start with initial state', () => {
    const validationError = 'Required Field'
    const { sut } = makeSut()
    TestFormHelper.testChildCount(sut, 'error-wrap', 0)
    TestFormHelper.testButtonIsDisabled(sut, 'submit', true)
    TestFormHelper.testStatusForField(sut, 'name', validationError)
    TestFormHelper.testStatusForField(sut, 'email', validationError)
    TestFormHelper.testStatusForField(sut, 'password', validationError)
    TestFormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
