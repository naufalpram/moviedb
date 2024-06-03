
import CardSkeleton from '../Card/CardSkeleton'

const ContainerSkeleton = ({ length, isWithTitle }) => {
  return (
    <>
        {Array.from({ length: length }, (_, i) => <CardSkeleton key={i} isWithTitle={isWithTitle} />)}
    </>
  )
}

export default ContainerSkeleton