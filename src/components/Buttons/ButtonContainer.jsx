import React from 'react'

const ButtonContainer = ({ container = "menu", display, children }) => {
  const Container = container;
  return (
    <Container className={display}>{children}</Container>
  )
}

export default ButtonContainer