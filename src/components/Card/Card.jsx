
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
const { VITE_IMAGE_URL: IMAGE_FETCH_URL } = import.meta.env;

const EmptyImage = () => (
  <div className='flex flex-col justify-center items-center w-52 h-80 bg-gray-400 text-black font-medium rounded-md'>
    <MdErrorOutline className='w-12 h-12' />
    No Image
  </div>
)

const Card = ({ path, imagePath, title, date}) => (
  <Link tabIndex='0' className='flex flex-col gap-4 items-center min-w-52 m-1' to={path}>
      {imagePath ? 
        <img src={`${IMAGE_FETCH_URL}${imagePath}`} alt={`${title} poster`} className='w-52 h-auto min-h-80 rounded-md cursor-pointer' /> : 
        <EmptyImage />
      }
      <div className='text-center'>
        {title && <p role='button' className='m-0 font-semibold max-w-48 hover:text-secondary-200 cursor-pointer'>{title}</p>}
        {date && <p className='text-sm font-semibold max-w-48 text-unselect-gray'>{date}</p>}
      </div>
  </Link>
)

export default Card