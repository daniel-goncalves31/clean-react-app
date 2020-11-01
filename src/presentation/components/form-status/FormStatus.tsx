import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/Spinner'
import FormContext from '@/presentation/contexts/form/FormContext'

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { mainError, isLoading } = state

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
