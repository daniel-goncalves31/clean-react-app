import React from 'react'
import Footer from '@/presentation/components/footer/Footer'
import Header from '@/presentation/components/header/Header'
import Styles from './login-styles.scss'
import Input from '@/presentation/components/input/Input'
import FormStatus from '@/presentation/components/form-status/FormStatus'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input autoComplete="off" type="email" name="email" placeholder="E-mail" />
        <Input autoComplete="off" type="password" name="password" placeholder="Password" />
        <button className={Styles.submit} type="submit">Login</button>
        <span className={Styles.link}>Create an account</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
