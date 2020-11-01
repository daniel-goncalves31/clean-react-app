import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Login from './Login'
import { mock, MockProxy } from 'jest-mock-extended'
import { Validation } from '@/presentation/protocols/Validation'

type SutTypes = {
  sut: RenderResult
  validationStub: MockProxy<Validation>
}

const email = 'any_email'
const password = 'any_password'

const makeSut = (): SutTypes => {
  const validationStub = mock<Validation>()
  const sut = render(<Login validation={validationStub} />)

  return {
    sut,
    validationStub
  }
}

describe('Login Page', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Required Field')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Required Field')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationStub.validate).toHaveBeenCalledWith({ email })
  })

  it('should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()

    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationStub.validate).toHaveBeenCalledWith({ password })
  })
})
