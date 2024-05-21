import React from 'react'
import { crewNameFormatter } from '../../../../helper/dataFormatter'

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

export default Crew