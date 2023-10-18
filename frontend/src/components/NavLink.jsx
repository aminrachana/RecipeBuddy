import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const NavLink = ({ to, children, className }) => {
    return (
        <Link
            to={to}
            className={twMerge("text-white hover:text-black text-lg px-3 py-2 font-medium", className)}
        >
            {children}
        </Link>
    )
}

export default NavLink