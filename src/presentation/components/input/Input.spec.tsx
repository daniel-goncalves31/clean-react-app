import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './Input'
import FormContext from '@/presentation/contexts/form/FormContext'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </FormContext.Provider>
  )

  return {
    sut
  }
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const { sut } = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
