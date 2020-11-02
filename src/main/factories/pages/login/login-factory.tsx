import { Login } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authenticaion-factory'
import { makeLoginValidation } from './login-validation-factory'

interface Props { }

const makeLogin: React.FC<Props> = () => {
  return (
    <Login validation={makeLoginValidation()} authentication={makeRemoteAuthentication()} />
  )
}

export default makeLogin
