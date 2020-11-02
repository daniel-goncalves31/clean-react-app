import { RemoteAuthenticationUseCase } from '@/data/usecases/authentication/RemoteAuthenticationUseCase'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/AxiosHttpClient'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import React from 'react'

interface Props { }

const makeLogin: React.FC<Props> = () => {
  const url = 'any_url'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthenticationUseCase(url, axiosHttpClient)
  const validationComposite = ValidationComposite.bind([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login validation={validationComposite} authentication={remoteAuthentication} />
  )
}

export default makeLogin
