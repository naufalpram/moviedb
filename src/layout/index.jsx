import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => {
  return (
    <div className='overflow-x-hidden'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default Layout