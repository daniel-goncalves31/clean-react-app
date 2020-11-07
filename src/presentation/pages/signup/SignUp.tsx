import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/Validation'

interface Props {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmationError: 'Required Field',
    mainError: ''
  })

  const { name, email, password } = state

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', name),
      emailError: validation.validate('email', email),
      passwordError: validation.validate('password', password)
    })
  }, [name, email, password])

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Create Account</h2>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Password confirmation" />
          <button data-testid="submit" disabled className={Styles.submit} type="submit">Sign Up</button>
          <span className={Styles.link}>Back to Login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
