import React from 'react';
import KnownFor from './KnownFor';
import CastCrew from './CastCrew';

const Credit = ({ creditData, mediaType, ...otherResult }) => {
  return (
    mediaType === 'person' ? <KnownFor /> : <CastCrew data={creditData} loading={otherResult.loading} status={otherResult.status} />
  )
}

export default Credit