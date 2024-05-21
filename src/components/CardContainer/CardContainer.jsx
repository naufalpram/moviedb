import React from 'react';

const CardContainer = ({ header = null, wrap = false, children }) => {
  return (
    <div className='w-full mx-28 overflow-x-hidden'>
        {header}
        <div className={`mt-7 mb-7 flex w-full ${wrap ? 'flex-wrap gap-8' : 'overflow-x-auto gap-16'}`}>
            {children}
        </div>
    </div>
  )
}

export default CardContainer