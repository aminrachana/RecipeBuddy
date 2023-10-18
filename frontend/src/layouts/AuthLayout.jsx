import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const AuthLayout = ({ title, children, link, linkName }) => {
    return (
        <>
            <div className='bg-primary h-screen flex flex-col items-center justify-center'>
                <Link to='/' className='cursor-pointer absolute top-10 left-10 text-white flex items-center'>
                    <IoIosArrowRoundBack size={35} />
                    <span className='p-3 text-lg'>Cancel</span>
                </Link>
                <Link to={link} className='cursor-pointer absolute top-10 right-10 text-white flex items-center'>
                    <span className='p-3 text-lg bg-white/10 rounded-md hover:bg-white/30'>{linkName}</span>
                </Link>
                <h1 className='text-4xl font-bold pb-5 text-white'>{title}</h1>
                <div className='bg-white p-6 md:w-1/3 sm:w-1/2 rounded-md'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default AuthLayout