import React, { useState } from 'react'
import { Transition } from "@headlessui/react";
import NavLink from './NavLink';
import { RxAvatar } from 'react-icons/rx'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/slice/authSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { userToken, data } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(reset())
    }

    return (
        <nav className="bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-shrink-0">
                            <img src="logo.png" alt="RecipeBuddy-Logo" className='h-[100px] w-[100px] object-contain'/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <NavLink to='/'>
                                    Home
                                </NavLink>
                                <NavLink to='/recipes'>
                                    Recipes
                                </NavLink>
                                <NavLink to='/ingredients'>
                                    Ingredients
                                </NavLink>

                                {!userToken ?
                                    <Link to='/auth/login' className='px-4 py-2 text-lg bg-white rounded-md hover:bg-gray-200 font-bold'>
                                        Login
                                    </Link>
                                    :
                                    <>
                                        <NavLink to='/dashboard/favorite-recipes'>
                                            Favorites
                                        </NavLink>
                                        {(data?.role === 'cook' || data?.role === 'admin') &&
                                            <>
                                                <NavLink to='/dashboard/add-recipe'>
                                                    Add Recipes
                                                </NavLink>
                                                <NavLink to='/dashboard/addIngredient'>
                                                    Add Ingredient
                                                </NavLink>
                                            </>}
                                        <Link className='cursor-pointer bg-white rounded-md font-bold hover:bg-gray-200 h-[45px] w-[45px] flex items-center justify-center'>
                                            <RxAvatar size={30} />
                                        </Link>
                                        <button onClick={handleLogout} className='px-4 py-2 text-lg bg-white rounded-md hover:bg-gray-200 font-bold'>
                                            Logout
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-secondary focus:bg-secondary hover:bg-secondary inline-flex items-center justify-center p-2 rounded-xs text-white focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="md:hidden" id="mobile-menu">
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink className="block">
                                Home
                            </NavLink>
                            <NavLink className="block">
                                About
                            </NavLink>
                            <NavLink className="block">
                                Recipes
                            </NavLink>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    )
}

export default Navbar