import React, { useCallback, useEffect, useReducer } from 'react'
import { useFetch } from '../../../../hooks/useFetch'
import { useParams } from 'react-router-dom';
import Crew from './Crew';
import NameSkeleton from './NameSkeleton';

function castCrewReducer(state, action) {
    switch (action.type) {
        case 'ASSIGN_MEMBERS':
            return {
                ...state,
                casts: action.payload.cast.slice(0,5),
                directors: action.payload.crew.filter(member => member.job === 'Director'),
                writers: action.payload.crew.filter(member => member.department === 'Writing' && member.job === 'Screenplay'),
                producers: action.payload.crew.filter(member => member.job === 'Producer').slice(0,4),
                editors: action.payload.crew.filter(member => member.job === 'Editor')
            };
        default:
            return state;
    }
}

const CastCrew = () => {
  const { mediaType, idName } = useParams();
  const [members, dispatch] = useReducer(castCrewReducer, {
    casts: [],
    directors: [],
    writers: [],
    producers: [],
    editors: []
  });
  const {data, loading, error, status, fetchData} = useFetch(
    `${mediaType}/${idName?.split('-')[0]}/credits`,
    {},
    useCallback((data) => ({
        data
    }), [])
  );

  useEffect(() => {
    fetchData();
  }, []);

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

export default CastCrew