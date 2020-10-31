import React from 'react'
import Styles from './logo-styles.scss'

interface Props { }

const Logo: React.FC<Props> = () => {
  return (
    <h1 className={Styles.logo}>
      Clean React App
    </h1>
  )
}

export default Logo
