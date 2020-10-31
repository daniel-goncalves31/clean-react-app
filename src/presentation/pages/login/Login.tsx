import React from 'react'
import Spinner from '@/presentation/components/spinner/Spinner'
import Styles from './login-styles.scss'
import Logo from '@/presentation/components/logo/Logo'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
      </header>
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="E-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Password" />
          <span className={Styles.status}>🔴</span>
        </div>
        <button className={Styles.submit} type="submit">Login</button>
        <span className={Styles.link}>Create Account</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <footer className={Styles.footer} />
    </div>
  )
}

export default Login
