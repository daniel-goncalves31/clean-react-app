import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: 'Required Field',
    password: 'Required Field',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input autoComplete="off" type="email" name="email" placeholder="E-mail" />
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
