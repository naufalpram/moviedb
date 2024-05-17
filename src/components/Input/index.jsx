import React from 'react'
import MainInput from './MainInput'

const index = ({ placeholder, onSubmit }) => {
  return (
    <MainInput placeholder={placeholder} onClick={onSubmit} />
  )
}

export default index