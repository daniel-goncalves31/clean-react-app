import React from 'react'
import SignUp from './SignUp'
import { RenderResult, render, fireEvent, waitFor } from '@testing-library/react'
import * as TestFormHelper from '@/presentation/test/FormHelper'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validation } from '@/presentation/protocols/Validation'
import { internet, random, name as fakeName } from 'faker'
import { AddAccountParams, AddAccountUseCase } from '@/domain/usecases/AddAccountUseCase'
import '@testing-library/jest-dom/extend-expect'

type SutTypes = {
  sut: RenderResult
  validationStub: MockProxy<Validation>
  addAccountUseCaseStub: MockProxy<AddAccountUseCase>
}

const validationError = 'Required Field'
const value = random.word()
const name = fakeName.findName()
const email = internet.email()
const password = internet.password()
const addAccountError = new Error(random.words(3))

const makeSut = (validationError: string = ''): SutTypes => {
  const validationStub = mock<Validation>()
  validationStub.validate.mockReturnValue(validationError)

  const addAccountUseCaseStub = mock<AddAccountUseCase>()

  const sut = render(
    <SignUp validation={validationStub} addAccountUseCase={addAccountUseCaseStub} />
  )
  return {
    sut,
    validationStub,
    addAccountUseCaseStub
  }
}

const simulateSubmit = async (sut: RenderResult, name = '', email = '', password = ''): Promise<void> => {
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
      await simulateSubmit(sut)

      await TestFormHelper.testIfElementExists(sut, 'spinner')
    })
  })

  describe('AddAccount UseCase', () => {
    it('should call AddAccountUseCase with correct values', async () => {
      const { sut, addAccountUseCaseStub } = makeSut()
      await simulateSubmit(sut, name, email, password)

      expect(addAccountUseCaseStub.add).toHaveBeenCalledWith<[AddAccountParams]>({ name, email, password, passwordConfirmation: password })
    })

    it('should prevent AddAccountUseCase to be called multiple times', async () => {
      const { sut, addAccountUseCaseStub } = makeSut()
      await simulateSubmit(sut, name, email, password)
      expect(addAccountUseCaseStub.add).toHaveBeenCalledTimes(1)
    })

    it('should not call AddAccountUseCase if form is invalid', async () => {
      const { sut, addAccountUseCaseStub } = makeSut(validationError)
      await simulateSubmit(sut)
      expect(addAccountUseCaseStub.add).toHaveBeenCalledTimes(0)
    })

    it('should hide spinner and present error if AddAccount fails', async () => {
      const { sut, addAccountUseCaseStub } = makeSut()
      addAccountUseCaseStub.add.mockImplementationOnce(() => {
        throw addAccountError
      })

      await simulateSubmit(sut, name, email, password)

      const errorWrap = await sut.findByTestId('error-wrap')
      expect(errorWrap).toHaveTextContent(addAccountError.message)

      TestFormHelper.testChildCount(sut, 'error-wrap', 1)
    })
  })
})
