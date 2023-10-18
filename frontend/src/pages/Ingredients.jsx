
import { Snackbar } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GeneralLayout from '../layouts/GeneralLayout'
import { deleteIngredient, getIngredient } from '../redux/actions/ingredientActions'

const Ingredients = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ingredients = useSelector((state) => state.ingredient)
    const user = useSelector((state) => state.auth)

    const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false)

    useEffect(() => {
        dispatch(getIngredient())
    }, [])

    const displayIngredient = ({ image }) => {
        const blob = new Blob([new Uint8Array(image?.data?.data)], { type: image?.contentType });
        const imageUrl = URL.createObjectURL(blob);

        return (
            <div>
                <img src={imageUrl} alt="Ingredient" className='h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-cover rounded-full' />
            </div>
        );
    }

    const handleDeleteIngredient = async ({ id }) => {
        setDeleteAlertIsOpen(false)
        const res = await dispatch(deleteIngredient({ id }))
        console.log('res ', res);
        if (res?.payload?.success) {
            setDeleteAlertIsOpen(true)
            dispatch(getIngredient())
        }
    }

    return (
        <GeneralLayout>
            <Snackbar
                autoHideDuration={3000}
                open={deleteAlertIsOpen}
                onClose={() => setDeleteAlertIsOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <div className='rounded-md text-white p-3 min-w-[300px]' style={{ backgroundColor: 'green' }}>
                    Deleted successfully
                </div>
            </Snackbar>
            <div className='flex flex-col items-center p-10'>
                <h1 className='text-4xl font-bold'>INGREDIENTS</h1>
                <div className='w-full p-5 mt-5'>
                    <div className='flex flex-wrap gap-5 items-center justify-evenly'>
                        {ingredients?.success && ingredients?.data?.length && ingredients?.data?.map((item, index) =>
                            <div key={index} className='bg-neutral-100 p-4 rounded-xl relative'>
                                {displayIngredient({ image: item?.photo })}
                                <h3 className='text-xl'>{item?.name}</h3>
                                {user?.data?.role === 'admin' &&
                                    <button
                                        type='button'
                                        className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm p-3 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute right-2 top-2'
                                        onClick={() =>
                                            handleDeleteIngredient({ id: item?._id })
                                        }
                                    >
                                        <BsTrash3 className='text-white' />
                                    </button>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                            <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default Ingredients