import React from 'react'
import SignUp from './SignUp'
import { RenderResult, render, fireEvent, waitFor } from '@testing-library/react'
import * as TestFormHelper from '@/presentation/test/FormHelper'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validation } from '@/presentation/protocols/Validation'
import { internet, random, name as fakeName } from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: MockProxy<Validation>
}

const validationError = 'Required Field'
const value = random.word()

const makeSut = (validationError: string = ''): SutTypes => {
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

const simulateValidSubmit = async (sut: RenderResult, name = fakeName.findName(), email = internet.email(), password = internet.password()): Promise<void> => {
  TestFormHelper.populateField(sut, 'name', name)
  TestFormHelper.populateField(sut, 'email', email)
  TestFormHelper.populateField(sut, 'password', password)
  TestFormHelper.populateField(sut, 'passwordConfirmation', password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Page', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut(validationError)
    TestFormHelper.testChildCount(sut, 'error-wrap', 0)
    TestFormHelper.testButtonIsDisabled(sut, 'submit', true)
    TestFormHelper.testStatusForField(sut, 'name', validationError)
    TestFormHelper.testStatusForField(sut, 'email', validationError)
    TestFormHelper.testStatusForField(sut, 'password', validationError)
    TestFormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  describe('Validation', () => {
    it('should show name error if Validation fails', async () => {
      const { sut } = makeSut(validationError)
      TestFormHelper.populateField(sut, 'name', value)
      TestFormHelper.testStatusForField(sut, 'name', validationError)
    })

    it('should show email error if Validation fails', async () => {
      const { sut } = makeSut(validationError)
      TestFormHelper.populateField(sut, 'email', value)
      TestFormHelper.testStatusForField(sut, 'email', validationError)
    })

    it('should show password error if Validation fails', async () => {
      const { sut } = makeSut(validationError)
      TestFormHelper.populateField(sut, 'password', value)
      TestFormHelper.testStatusForField(sut, 'password', validationError)
    })

    it('should show passwordConfirmation error if Validation fails', async () => {
      const { sut } = makeSut(validationError)
      TestFormHelper.populateField(sut, 'passwordConfirmation', value)
      TestFormHelper.testStatusForField(sut, 'passwordConfirmation', validationError)
    })

    it('should show valid name state if Validation succeeds', () => {
      const { sut } = makeSut()
      TestFormHelper.populateField(sut, 'name', value)
      TestFormHelper.testStatusForField(sut, 'name')
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()
      TestFormHelper.populateField(sut, 'email', value)
      TestFormHelper.testStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()
      TestFormHelper.populateField(sut, 'password', value)
      TestFormHelper.testStatusForField(sut, 'password')
    })

    it('should show valid passwordConfirmation state if Validation succeeds', () => {
      const { sut } = makeSut()
      TestFormHelper.populateField(sut, 'passwordConfirmation', value)
      TestFormHelper.testStatusForField(sut, 'passwordConfirmation')
    })

    it('should enable submit button if form is valid', () => {
      const { sut } = makeSut()
      TestFormHelper.populateField(sut, 'name', value)
      TestFormHelper.populateField(sut, 'email', value)
      TestFormHelper.populateField(sut, 'password', value)
      TestFormHelper.populateField(sut, 'passwordConfirmation', value)
      TestFormHelper.testButtonIsDisabled(sut, 'submit', false)
    })
  })

  describe('Spinner', () => {
    it('should show spinner on submit', async () => {
      const { sut } = makeSut()
      await simulateValidSubmit(sut)

      await TestFormHelper.testIfElementExists(sut, 'spinner')
    })
  })
})
