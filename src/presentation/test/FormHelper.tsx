import { fireEvent, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'OK')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (sut: RenderResult, filedName: string, value: string): void => {
  const input = sut.getByTestId(filedName) as HTMLInputElement
  fireEvent.input(input, { target: { value } })
}

export const testIfElementExists = async (sut: RenderResult, testId: string): Promise<void> => {
  const element = await sut.findByTestId(testId)
  expect(element).toBeInTheDocument()
}
