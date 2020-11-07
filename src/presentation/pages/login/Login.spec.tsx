import React from 'react'
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Login from './Login'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validation } from '@/presentation/protocols/Validation'
import { internet, random } from 'faker'
import { AuthenticationParams, AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'
import { InvalidCredentialsError } from '@/domain/errors'
import '@testing-library/jest-dom/extend-expect'
import { mockAccountModel } from '@/domain/test/mock-account'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { SaveAccessTokenUseCase } from '@/domain/usecases/SaveAccessTokenUseCase'
import * as TestFormHelper from '@/presentation/test/FormHelper'

type SutTypes = {
  sut: RenderResult
  validationStub: MockProxy<Validation>
  authenticationStub: MockProxy<AuthenticationUseCase>
  saveAccessTokenStub: MockProxy<SaveAccessTokenUseCase>
}

const email = internet.email()
const password = internet.password(10)
const errorMessage = random.words(3)
const invalidCredentialsError = new InvalidCredentialsError()
const accountModel = mockAccountModel()
const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (message: string = ''): SutTypes => {
  const validationStub = mock<Validation>()
  validationStub.validate.mockReturnValue(message)

  const authenticationStub = mock<AuthenticationUseCase>()
  authenticationStub.auth.mockResolvedValue(accountModel)

  const saveAccessTokenStub = mock<SaveAccessTokenUseCase>()

  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationStub} saveAccessToken={saveAccessTokenStub} />
    </Router>
  )

  return {
    sut,
    validationStub,
    authenticationStub,
    saveAccessTokenStub
  }
}

const simulateValidSubmitEvent = (sut: RenderResult): void => {
  TestFormHelper.populateField(sut, 'email', email)
  TestFormHelper.populateField(sut, 'password', password)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}
describe('Login Page', () => {
  describe('Initial State', () => {
    it('should start with initial state', () => {
      const { sut } = makeSut(errorMessage)

      TestFormHelper.testChildCount(sut, 'error-wrap', 0)
      TestFormHelper.testButtonIsDisabled(sut, 'submit', true)
      TestFormHelper.testStatusForField(sut, 'email', errorMessage)
      TestFormHelper.testStatusForField(sut, 'password', errorMessage)
    })
  })

  describe('Validation', () => {
    it('should call Validation with correct email', () => {
      const { sut, validationStub } = makeSut()

      TestFormHelper.populateField(sut, 'email', email)
      expect(validationStub.validate).toHaveBeenCalledWith('email', email)
    })

    it('should call Validation with correct password', () => {
      const { sut, validationStub } = makeSut()

      TestFormHelper.populateField(sut, 'password', password)
      expect(validationStub.validate).toHaveBeenCalledWith('password', password)
    })

    it('should show email error if Validation fails', () => {
      const { sut } = makeSut(errorMessage)

      TestFormHelper.populateField(sut, 'email', email)
      TestFormHelper.testStatusForField(sut, 'email', errorMessage)
    })

    it('should show password error if Validation fails', () => {
      const { sut } = makeSut(errorMessage)

      TestFormHelper.populateField(sut, 'password', password)
      TestFormHelper.testStatusForField(sut, 'password', errorMessage)
    })

    it('should show valid email state if Validation succeeds', () => {
      const { sut } = makeSut()

      TestFormHelper.populateField(sut, 'email', email)
      TestFormHelper.testStatusForField(sut, 'email')
    })

    it('should show valid password state if Validation succeeds', () => {
      const { sut } = makeSut()

      TestFormHelper.populateField(sut, 'password', password)
      TestFormHelper.testStatusForField(sut, 'password')
    })
  })

  describe('Submit Button', () => {
    it('should enable submit button if form is valid', () => {
      const { sut } = makeSut()

      TestFormHelper.populateField(sut, 'email', email)
      TestFormHelper.populateField(sut, 'password', password)

      TestFormHelper.testButtonIsDisabled(sut, 'submit', false)
    })
  })

  describe('Spinner', () => {
    it('should show spinner on submit', () => {
      const { sut } = makeSut()

      TestFormHelper.populateField(sut, 'email', email)
      TestFormHelper.populateField(sut, 'password', password)

      const submitButton = sut.getByTestId('submit') as HTMLButtonElement
      fireEvent.click(submitButton)

      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  describe('Authentication UseCase', () => {
    it('should call Authentication with correct values', async () => {
      const { sut, authenticationStub } = makeSut()

      simulateValidSubmitEvent(sut)

      expect(authenticationStub.auth).toHaveBeenCalledWith<[AuthenticationParams]>({ email, password })
    })

    it('should call Authentication only once', async () => {
      const { sut, authenticationStub } = makeSut()

      simulateValidSubmitEvent(sut)
      simulateValidSubmitEvent(sut)

      expect(authenticationStub.auth).toHaveBeenCalledTimes(1)
    })

    it('should not call Authentication if form is invalid', async () => {
      const { sut, authenticationStub } = makeSut(errorMessage)

      TestFormHelper.populateField(sut, 'email', '')

      fireEvent.submit(sut.getByTestId('form'))
      expect(authenticationStub.auth).toHaveBeenCalledTimes(0)
    })

    it('should present error if Auhtentication fails', async () => {
      const { sut, authenticationStub } = makeSut()
      authenticationStub.auth.mockRejectedValueOnce(invalidCredentialsError)

      simulateValidSubmitEvent(sut)

      const mainError = await sut.findByTestId('main-error')
      expect(mainError).toHaveTextContent(invalidCredentialsError.message)

      TestFormHelper.testChildCount(sut, 'error-wrap', 1)
    })
  })

  describe('SaveAccessTokenUseCase', () => {
    it('should call SaveAccessToken on success', async () => {
      const { sut, saveAccessTokenStub } = makeSut()

      simulateValidSubmitEvent(sut)

      await waitFor(() => {
        expect(saveAccessTokenStub.save).toHaveBeenCalledWith<[string]>(accountModel.accessToken)
      })
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/')
    })

    it('should present an error if SaveAccessToken fails', async () => {
      const { sut, saveAccessTokenStub } = makeSut()

      const error = new Error(errorMessage)
      saveAccessTokenStub.save.mockImplementationOnce(() => {
        throw error
      })

      simulateValidSubmitEvent(sut)

      const mainError = await sut.findByTestId('main-error')
      expect(mainError).toHaveTextContent(error.message)

      TestFormHelper.testChildCount(sut, 'error-wrap', 1)
    })
  })

  describe('Router', () => {
    it('should navigates to signup correctly', async () => {
      const { sut } = makeSut()

      fireEvent.click(sut.getByTestId('signup'))

      expect(history.length).toBe(2)
      expect(history.location.pathname).toBe('/signup')
    })
  })
})
