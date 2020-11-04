import { Login } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authenticaion-factory'
import { makeLocalSaveAccessToken } from '../../usecases/save-access-token/local-save-access-token-factory'
import { makeLoginValidation } from './login-validation-factory'

interface Props { }

const makeLogin: React.FC<Props> = () => {
  return (
    <Login validation={makeLoginValidation()} authentication={makeRemoteAuthentication()} saveAccessToken={makeLocalSaveAccessToken()} />
  )
}

export default makeLogin
