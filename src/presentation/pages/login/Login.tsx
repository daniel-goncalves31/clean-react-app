import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/Validation'

interface Props {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: 'Required Field',
    passwordError: 'Required Field',
    mainError: ''
  })

  const { email } = state

  useEffect(() => {
    validation.validate({ email })
  }, [email])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input data-testid="email" autoComplete="off" type="email" name="email" placeholder="E-mail" />
          <Input autoComplete="off" type="password" name="password" placeholder="Password" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled>Login</button>
          <span className={Styles.link}>Create an account</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
