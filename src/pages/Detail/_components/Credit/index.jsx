
import KnownFor from './KnownFor';
import CastCrew from './CastCrew';

const Credit = ({ creditData, mediaType, ...otherResult }) => {
  const Component = mediaType === 'person' ? KnownFor : CastCrew;
  return (
    <Component data={creditData} loading={otherResult.loading} status={otherResult.status} />
  )
}

export default Credit