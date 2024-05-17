import React from 'react'

const BasicData = ({ result }) => {
  return (
    <div>
        <p className='italic text-secondary-400 font-medium text-[28px]'>{result?.data?.tagline}</p>
    </div>
  )
}

export default BasicData