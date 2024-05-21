import { Button, ButtonContainer } from "../../../components"

const TrendingHeader = ({ onSelect, timeWindow }) => (
    <div className='flex gap-4'>
        <h2 className='text-3xl font-semibold'>Trending</h2>
        <ButtonContainer display="flex gap-3 items-center">
            <Button onClick={() => onSelect('day')}  variant={timeWindow === 'day' ? 'secondary': 'unselect'}>Today</Button>
            <Button onClick={() => onSelect('week')} variant={timeWindow === 'week' ? 'secondary' : 'unselect'}>This Week</Button>
        </ButtonContainer>
    </div>
)

export default TrendingHeader