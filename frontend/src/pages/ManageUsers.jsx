import React from 'react'
import GeneralLayout from '../layouts/GeneralLayout'

const ManageUsers = () => {
    return (
        <GeneralLayout>
            <div className='flex flex-col items-center p-10'>
                <h1 className='text-4xl font-bold'>USERS</h1>
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
        </GeneralLayout>
    )
}

export default ManageUsers