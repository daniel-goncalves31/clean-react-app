import FormContext from '@/presentation/contexts/form/FormContext'
import React, { useContext } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = ({ name, ...otherProps }) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${name}Error`]

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <div className={Styles.inputWrap}>
      <input data-testid={name} name={name} {...otherProps} readOnly onFocus={enableInput} onChange={handleChange} />
      <span data-testid={`${name}-status`} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
