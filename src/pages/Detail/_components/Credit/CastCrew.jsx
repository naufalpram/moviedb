import React, { useEffect, useReducer } from 'react'
import { crewNameFormatter } from '../../../../helper/dataFormatter'

function castCrewReducer(state, action) {
    switch (action.type) {
        case 'ASSIGN_MEMBERS':
            return {
                ...state,
                casts: action.payload.cast.slice(0,6),
                directors: action.payload.crew.filter(member => member.job === 'Director'),
                writers: action.payload.crew.filter(member => member.department === 'Writing' && member.job === 'Screenplay'),
                producers: action.payload.crew.filter(member => member.job === 'Producer').slice(0,4),
                editors: action.payload.crew.filter(member => member.job === 'Editor')
            };
        default:
            return state;
    }
}

const CastCrew = ({ data, loading, status }) => {
  const [members, dispatch] = useReducer(castCrewReducer, {
    casts: [],
    directors: [],
    writers: [],
    producers: [],
    editors: []
  });

  useEffect(() => {
    if (data) {
        dispatch({
            type: 'ASSIGN_MEMBERS',
            payload: data
        })
        
    }
  }, [data]);

  return (
    <div className='flex gap-40 mt-16'>
        <div>
            {loading && <NameSkeleton length={4} />}
            {status === 'resolved' && (
                <>
                <Crew title='Director'>
                    {members.directors}
                </Crew>
                <Crew title='Writer'>
                    {members.writers}
                </Crew>
                <Crew title='Producer'>
                    {members.producers}
                </Crew>
                <Crew title='Editor'>
                    {members.editors}
                </Crew>
                </>
            )}
        </div>
        <div>
            {loading && <NameSkeleton length={4} />}
            {status === 'resolved' && (
                <div className='flex flex-col gap-1'>
                    <span className='font-bold'>Starring</span>
                    {
                        members.casts?.map(cast => <span key={cast.id} className='font-light'>{cast.name}</span>)
                    }
                </div>
            )}
        </div>
    </div>
  )
}

const Crew = ({ title, children }) => {
    return (
        <>
            <div className='flex gap-2'>
                <span className='font-bold'>{title}</span>
                {children?.map((member, idx) => <span key={member.id} className='font-light'>{crewNameFormatter(member.name, idx, children)}</span>)}
            </div>
        </>
    )
}

const NameSkeleton = ({ length }) => {
    return (
        <div className='flex flex-col gap-2'>
            {Array.from({ length: length }, (_, i) => (
                <div key={i} className='bg-gray-500 w-48 h-5 animate-pulse'></div>
            ))}
        </div>
    )
}

export default CastCrew