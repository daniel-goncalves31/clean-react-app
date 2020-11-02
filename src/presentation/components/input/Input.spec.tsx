import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input from './Input'
import FormContext from '@/presentation/contexts/form/FormContext'
import { database } from 'faker'

type SutTypes = {
  sut: RenderResult
}

const field = database.column()

const makeSut = (): SutTypes => {
  const sut = render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={field} />
    </FormContext.Provider>
  )

  return {
    sut
  }
}

describe('Input Component', () => {
  it('Should begin with readOnly', () => {
    const { sut } = makeSut()
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  it('Should remove readOnly on focus', () => {
    const { sut } = makeSut()
    const input = sut.getByTestId(field) as HTMLInputElement

    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
