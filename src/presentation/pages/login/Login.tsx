import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/Validation'
import { AuthenticationUseCase } from '@/domain/usecases/AuthenticationUseCase'
import { Link } from 'react-router-dom'

interface Props {
  validation: Validation
  authentication: AuthenticationUseCase
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  const { email, password, emailError, passwordError, isLoading } = state

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', email),
      passwordError: validation.validate('password', password)
    })
  }, [email, password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (isLoading || emailError || passwordError) return
      setState({
        ...state,
        isLoading: true,
        mainError: ''
      })

      const account = await authentication.auth({ email, password })
      localStorage.setItem('accessToken', account.accessToken)
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input data-testid="email" autoComplete="off" type="email" name="email" placeholder="E-mail" />
          <Input data-testid="password" autoComplete="off" type="password" name="password" placeholder="Password" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled={!!emailError || !!passwordError}>Login</button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>Create an account</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
