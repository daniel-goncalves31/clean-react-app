import React from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/Spinner'
import { useFormContext } from '@/presentation/contexts/form/FormContext'

const FormStatus: React.FC = () => {
  const { formState } = useFormContext()
  const { isLoading, errorMessage } = formState

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>Erro</span>}
    </div>
  )
}

export default FormStatus
