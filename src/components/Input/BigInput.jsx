import React, { forwardRef } from 'react'

const BigInput = forwardRef(({ name, placeholder, display }, ref) => {
  return (
    <textarea ref={ref} name={name} id="big-input" className={display} placeholder={placeholder}></textarea>
  )
})

export default BigInput