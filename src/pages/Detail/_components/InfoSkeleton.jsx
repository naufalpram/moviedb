const InfoSkeleton = () => {
    return (
        <>
        <div className='w-72 h-8 bg-gray-500 animate-pulse'></div>
        <div className='my-2 w-96 h-10 bg-gray-500 animate-pulse'></div>
        <div className='flex gap-5'>
            <div className='w-36 h-6 bg-gray-500 animate-pulse'></div>
            <div className='w-20 h-6 bg-gray-500 animate-pulse'></div>
            <div className='w-20 h-6 bg-gray-500 animate-pulse'></div>
            <div className='w-20 h-6 bg-gray-500 animate-pulse'></div>
            <div className='flex gap-2 items-center'>
            <div className='w-8 h-6 bg-gray-500 animate-pulse' />
            <div className='w-20 h-6 bg-gray-500 animate-pulse'></div>
            </div>
        </div>
        <div className='mt-5'>
            <div className='mt-2 w-[720px] h-6 bg-gray-500 animate-pulse'></div>
            <div className='mt-2 w-[680px] h-6 bg-gray-500 animate-pulse'></div>
            <div className='mt-2 w-[600px] h-6 bg-gray-500 animate-pulse'></div>
        </div>
        </>
    )
}

export default InfoSkeleton;