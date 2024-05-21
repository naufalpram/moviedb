import React from 'react'

const NameSkeleton = ({ length }) => {
    return (
        <div className='flex flex-col gap-2'>
            {Array.from({ length: length }, (_, i) => (
                <div key={i} className='bg-gray-500 w-48 h-5 animate-pulse'></div>
            ))}
        </div>
    )
}

export default NameSkeleton