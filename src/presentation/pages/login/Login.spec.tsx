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

describe('Login Page', () => {
  afterEach(cleanup)

  describe('Initial State', () => {
    it('should start with initial state', () => {
      const { sut } = makeSut(errorMessage)

      const errorWrap = sut.getByTestId('error-wrap')
      expect(errorWrap.childElementCount).toBe(0)

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)

      const emailStatus = sut.getByTestId('email-status')
      expect(emailStatus.title).toBe(errorMessage)
      expect(emailStatus.textContent).toBe('🔴')

      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe(errorMessage)
      expect(passwordStatus.textContent).toBe('🔴')
    })
  })

  describe('Validation', () => {
    it('should call Validation with correct email', () => {
      const { sut, validationStub } = makeSut()

      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: email } })

      expect(validationStub.validate).toHaveBeenCalledWith('email', email)
    })

    it('should call Validation with correct password', () => {
      const { sut, validationStub } = makeSut()

      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: password } })

      expect(validationStub.validate).toHaveBeenCalledWith('password', password)
    })

    it('should show email error if Validation fails', () => {
      const { sut } = makeSut(errorMessage)

      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: email } })

      const emailStatus = sut.getByTestId('email-status')
      expect(emailStatus.title).toBe(errorMessage)
      expect(emailStatus.textContent).toBe('🔴')
    })

    it('should show password error if Validation fails', () => {
      const { sut } = makeSut(errorMessage)

      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: password } })

      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe(errorMessage)
      expect(passwordStatus.textContent).toBe('🔴')
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()

      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: email } })

      const emailStatus = sut.getByTestId('email-status')
      expect(emailStatus.title).toBe(successMessage)
      expect(emailStatus.textContent).toBe('🟢')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()

      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: password } })

      const passwordStatus = sut.getByTestId('password-status')
      expect(passwordStatus.title).toBe(successMessage)
      expect(passwordStatus.textContent).toBe('🟢')
    })
  })

  describe('Submit Button', () => {
    it('should enable submit button if form is valid', () => {
      const { sut } = makeSut()

      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: email } })

      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: password } })

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(false)
    })
  })

  describe('Spinner', () => {
    it('should show spinner on submit', () => {
      const { sut } = makeSut()

      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: email } })

      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: password } })

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      fireEvent.click(submitButton)

      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  describe('Authentication UseCase', () => {
    it('should call Authentication with correct values', async () => {
      const { sut, authenticationStub } = makeSut()

      const emailInput = sut.getByTestId('email')
      fireEvent.input(emailInput, { target: { value: email } })

      const passwordInput = sut.getByTestId('password')
      fireEvent.input(passwordInput, { target: { value: password } })

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      fireEvent.click(submitButton)

      expect(authenticationStub.auth).toHaveBeenCalledWith<[AuthenticationParams]>({ email, password })
    })
  })
})
