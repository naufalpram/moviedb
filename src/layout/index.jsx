import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => {
  const [isLogoutCollapse, setIsLogoutCollapse] = useState(false);
  return (
    <div className='overflow-x-hidden'>
        <Header isLogoutCollapse={isLogoutCollapse} handleLogoutCollapse={setIsLogoutCollapse} />
        <div onClick={() => setIsLogoutCollapse(false)}>
          {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout