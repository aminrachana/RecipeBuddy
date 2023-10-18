import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const GeneralLayout = ({ children }) => {
    return (
        <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <div className='flex-1'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default GeneralLayout