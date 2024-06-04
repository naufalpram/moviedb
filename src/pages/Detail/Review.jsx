import { useRef, useState } from 'react';
import { BigInput, Button, ButtonContainer } from '../../components';
import { getIsLogin } from '../../helper/localStorageHelper';
import { dateFormatter } from '../../helper/dataFormatter';
import { Markup } from 'interweave';

function sliceLongText(text = '') {
    return text.slice(0, 250) + '...';
}

const ReviewSkeleton = () => {
    return (
        <div className='mt-6 w-2/3 h-40 rounded-md p-4 border-y-2 border-unselect-gray'>
            <div className='h-4 bg-gray-400 animate-pulse w-1/2'></div>
            <div className='h-4 bg-gray-400 animate-pulse mt-2'></div>
            <div className='h-4 bg-gray-400 animate-pulse mt-2'></div>
            <div className='h-4 bg-gray-400 animate-pulse mt-2'></div>
            <div className='h-4 w-2/3 bg-gray-400 animate-pulse mt-2'></div>
        </div>
    )
}

const ReviewContent = ({ children }) => {
    const [collapseReadMore, toggleCollapse] = useState(false);

    return (
        <div className='mt-2'>
            <Markup content={collapseReadMore ? children : sliceLongText(children)} /><br/>
            <button className='underline' onClick={() => toggleCollapse(prev => !prev)}>See {collapseReadMore ? 'Less' : 'More'}</button>
        </div>
    )
}


const Review = ({ result }) => {
  const { data, loading, status} = result;
  const isLoggedIn = getIsLogin();
  const reviewRef = useRef();

  function handleSubmit(review) {
    if (!isLoggedIn) {
        alert('You must login to an account to write a review');
    }
    console.log(review)
    reviewRef.current.value = '';
  }

  return (
    <section id='media-review' className='mt-20 w-full flex justify-center'>
        <div className='mx-28 flex flex-col items-center'>
            <h2 className='font-bold text-3xl'>Reviews</h2>
            <div className='flex flex-col w-80 md:w-[640px] lg:w-[780px] gap-2'>
                <BigInput ref={reviewRef} name='review' placeholder='Write your own review!' display='mt-4 resize-none w-full border border-white rounded p-4' />
                <ButtonContainer container='span' display='self-end'>
                    <Button disabled={!isLoggedIn} variant={!isLoggedIn ? 'unselect' : 'secondary'} onClick={() => handleSubmit(reviewRef.current.value)}>Submit</Button>
                </ButtonContainer>
            </div>
            <div className='w-full flex flex-col items-center'>
                {loading && <ReviewSkeleton />}
                {status === 'resolved' && data?.map( review => (
                    <div key={review.id} className='mt-6 w-full max-w-[1024px] p-4 border-t-2 border-unselect-gray'>
                        <p className='text-lg font-semibold'>{review?.author}</p>
                        <p className='text-unselect-gray font-medium'>Written at {dateFormatter(review?.created_at)}</p>
                        <ReviewContent>
                            {review?.content}
                        </ReviewContent>
                    </div>
                  )
                )}
            </div>
        </div>
    </section>
  )
}

export default Review