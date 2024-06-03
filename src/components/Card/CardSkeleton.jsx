

const CardSkeleton = ({ isWithTitle }) => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center min-w-52'>
        <div className='w-52 h-80 bg-gray-500 animate-pulse rounded-lg'></div>
        {isWithTitle && <p className='m-0 font-semibold text-center text-transparent bg-gray-500 animate-pulse w-full rounded-sm'>Loading</p>}
    </div>
  )
}

export default CardSkeleton