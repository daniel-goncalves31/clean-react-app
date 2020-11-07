import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/Validation'
import { AddAccountUseCase } from '@/domain/usecases/AddAccountUseCase'

interface Props {
  validation: Validation
  addAccountUseCase: AddAccountUseCase
}

const SignUp: React.FC<Props> = ({ validation, addAccountUseCase }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  const { name, email, password, passwordConfirmation, nameError, emailError, passwordError, passwordConfirmationError, isLoading } = state

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', name),
      emailError: validation.validate('email', email),
      passwordError: validation.validate('password', password),
      passwordConfirmationError: validation.validate('passwordConfirmation', passwordConfirmation)
    })
  }, [name, email, password, passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, isLoading: true })

    if (isLoading || nameError || emailError || passwordError || passwordConfirmationError) return

    try {
      await addAccountUseCase.add({ email, name, passwordConfirmation, password })
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit} >
          <h2>Create Account</h2>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Password confirmation" />
          <button data-testid="submit" disabled={!!(emailError || nameError || passwordError || passwordConfirmationError)} className={Styles.submit} type="submit">Sign Up</button>
          <span className={Styles.link}>Back to Login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
