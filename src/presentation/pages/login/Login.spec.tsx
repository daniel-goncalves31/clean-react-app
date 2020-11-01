import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './Login'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validation } from '@/presentation/protocols/Validation'
import { internet, random } from 'faker'
import { AuthenticationParams, AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'

type SutTypes = {
  sut: RenderResult
  validationStub: MockProxy<Validation>
  authenticationStub: MockProxy<AuthenticationUseCase>
}

const email = internet.email()
const password = internet.password()
const errorMessage = random.words(3)
const successMessage = 'OK'

const makeSut = (message: string = ''): SutTypes => {
  const validationStub = mock<Validation>()
  validationStub.validate.mockReturnValue(message)

  const authenticationStub = mock<AuthenticationUseCase>()

  const sut = render(<Login validation={validationStub} authentication={authenticationStub} />)

  return {
    sut,
    validationStub,
    authenticationStub
  }
}

const populateField = (sut: RenderResult, testId: string, value: string): void => {
  const input = sut.getByTestId(testId)
  fireEvent.input(input, { target: { value } })
}

const simulateSubmitEvent = (sut: RenderResult): void => {
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const inputStatus = sut.getByTestId(`${fieldName}-status`)
  expect(inputStatus.title).toBe(validationError || successMessage)
  expect(inputStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Page', () => {
  afterEach(cleanup)

  describe('Initial State', () => {
    it('should start with initial state', () => {
      const { sut } = makeSut(errorMessage)

      const errorWrap = sut.getByTestId('error-wrap')
      expect(errorWrap.childElementCount).toBe(0)

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)

      simulateStatusForField(sut, 'email', errorMessage)
      simulateStatusForField(sut, 'password', errorMessage)
    })
  })

  describe('Validation', () => {
    it('should call Validation with correct email', () => {
      const { sut, validationStub } = makeSut()

      populateField(sut, 'email', email)
      expect(validationStub.validate).toHaveBeenCalledWith('email', email)
    })

    it('should call Validation with correct password', () => {
      const { sut, validationStub } = makeSut()

      populateField(sut, 'password', password)
      expect(validationStub.validate).toHaveBeenCalledWith('password', password)
    })

    it('should show email error if Validation fails', () => {
      const { sut } = makeSut(errorMessage)

      populateField(sut, 'email', email)
      simulateStatusForField(sut, 'email', errorMessage)
    })

    it('should show password error if Validation fails', () => {
      const { sut } = makeSut(errorMessage)

      populateField(sut, 'password', password)
      simulateStatusForField(sut, 'password', errorMessage)
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()

      populateField(sut, 'email', email)
      simulateStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()

      populateField(sut, 'password', password)
      simulateStatusForField(sut, 'password')
    })
  })

  describe('Submit Button', () => {
    it('should enable submit button if form is valid', () => {
      const { sut } = makeSut()

      populateField(sut, 'email', email)
      populateField(sut, 'password', password)

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(false)
    })
  })

  describe('Spinner', () => {
    it('should show spinner on submit', () => {
      const { sut } = makeSut()

      populateField(sut, 'email', email)
      populateField(sut, 'password', password)

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      fireEvent.click(submitButton)

      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  describe('Authentication UseCase', () => {
    it('should call Authentication with correct values', async () => {
      const { sut, authenticationStub } = makeSut()

      populateField(sut, 'email', email)
      populateField(sut, 'password', password)

      simulateSubmitEvent(sut)
      expect(authenticationStub.auth).toHaveBeenCalledWith<[AuthenticationParams]>({ email, password })
    })
  })
})
