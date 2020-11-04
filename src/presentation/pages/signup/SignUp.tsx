import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import { Footer, Input, LoginHeader, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'

const SignUp: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Required Field',
    emailError: 'Required Field',
    passwordError: 'Required Field',
    passwordConfirmationError: 'Required Field',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state }}>
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
