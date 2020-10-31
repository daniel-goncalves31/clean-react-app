import React, { useContext, useState } from 'react'

type FormState = {
  isLoading: boolean
  errorMessage: string
}

type FormContextType = {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
}

const initialState = { isLoading: false, errorMessage: '' }

const FormContext = React.createContext<FormContextType>({
  formState: initialState,
  setFormState: () => { }
})

const useFormContext = (): FormContextType => useContext(FormContext)

const FormContextProvider: React.FC = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialState)

  return (
    <FormContext.Provider value={{ formState, setFormState }} >
      {children}
    </FormContext.Provider>
  )
}

export { useFormContext, FormContextProvider }
