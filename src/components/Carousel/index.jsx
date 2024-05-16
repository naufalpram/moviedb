import React from 'react';

const index = ({ header = null, wrap = false, children }) => {
  return (
    <div className='w-full mx-28 overflow-x-hidden'>
        {header}
        <div className={`mt-7 mb-7 flex w-full gap-16 ${wrap ? 'flex-wrap' : 'overflow-x-auto'}`}>
            {children}
        </div>
    </div>
  )
}

export default index