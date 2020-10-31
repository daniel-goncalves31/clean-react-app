import React from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import { FormContextProvider } from '@/presentation/contexts/form/FormContext'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContextProvider>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input autoComplete="off" type="email" name="email" placeholder="E-mail" />
          <Input autoComplete="off" type="password" name="password" placeholder="Password" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled>Login</button>
          <span className={Styles.link}>Create an account</span>
          <FormStatus />
        </form>
      </FormContextProvider>
      <Footer />
    </div>
  )
}

export default Login
