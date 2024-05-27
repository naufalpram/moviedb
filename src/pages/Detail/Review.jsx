import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BigInput, Button, ButtonContainer } from '../../components';
import { useFetch } from '../../hooks/useFetch';
import { getIsLogin } from '../../helper/localStorageHelper';
import { dateFormatter } from '../../helper/dataFormatter';
import ReactMarkdown from 'react-markdown';
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


const Review = ({ mediaType, id }) => {
  const isLoggedIn = getIsLogin();
  const reviewRef = useRef();
  const {data, loading, error, status, fetchData} = useFetch(
    `${mediaType}/${id}/reviews`,
    {},
    useCallback((data) => ({
        data: data?.results
    }), [])
  );

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(review) {
    if (!isLoggedIn) {
        alert('You must login to an account to write a review');
    }
    console.log(review)
    reviewRef.current.value = '';
  }

  return (
    <section id='media-review' className='mt-12 w-full'>
        <div className='mx-28'>
            <h2 className='font-bold text-3xl'>Reviews</h2>
            <div className='flex flex-col w-80 md:w-[640px] lg:w-[780px] gap-2'>
                <BigInput ref={reviewRef} name='review' placeholder='Write your own review!' display='mt-4 resize-none w-full border border-white rounded p-4' />
                <ButtonContainer container='span' display='self-end'>
                    <Button disabled={!isLoggedIn} variant={!isLoggedIn ? 'unselect' : 'secondary'} onClick={() => handleSubmit(reviewRef.current.value)}>Submit</Button>
                </ButtonContainer>
            </div>
            <ul className='w-full'>
                {loading && <ReviewSkeleton />}
                {status === 'resolved' && data?.map( review => (
                <li key={review?.id} className='list-none'>
                    <div className='mt-6 w-2/3 p-4 border-t-2 border-unselect-gray'>
                        <p className='w-1/2 text-lg font-semibold'>{review?.author}</p>
                        <p className='text-unselect-gray font-medium'>Written at {dateFormatter(review?.created_at)}</p>
                        <ReviewContent>
                            {review?.content}
                        </ReviewContent>
                    </div>
                </li>)
                )}
            </ul>
        </div>
    </section>
  )
}

export default Review