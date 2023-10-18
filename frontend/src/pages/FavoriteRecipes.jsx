import React, { useEffect, useMemo, useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeartButton from '../components/HeartButton'
import GeneralLayout from '../layouts/GeneralLayout'
import { getFavorite, toggleFavorite } from '../redux/actions/favoriteActions'

const FavoriteRecipes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const favorites = useSelector((state) => state.favorite)
    const user = useSelector((state) => state.auth)

    const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false)

    useEffect(() => {
        dispatch(getFavorite({ userId: user?.data?._id }))
    }, [])

    const displayImage = ({ image }) => {
        const blob = new Blob([new Uint8Array(image?.data?.data)], { type: image?.contentType });
        const imageUrl = URL.createObjectURL(blob);

        return (
            <div>
                <img src={imageUrl} alt="Recipe Thumbnail" className='h-[250px] w-full object-cover rounded-t-md' />
            </div>
        );
    }

    const handleHeartClick = async ({ recipeId }) => {
        await dispatch(toggleFavorite({ userId: user?.data?._id, recipeId }))
        if (favorites.success) {
            dispatch(getFavorite({ userId: user?.data?._id }))
        }
    }

    return (
        <GeneralLayout>
            <div className='flex flex-col items-center p-10'>
                <h1 className='text-4xl font-bold'>FAVORITE RECIPES</h1>
                {(!favorites?.success || !favorites?.data.length) &&
                    <div className='m-5 p-5 text-center text-muted'>
                        No data to display
                    </div>
                }
                <div className='w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5 mt-5'>
                    {favorites?.success && favorites?.data && favorites?.data?.map((item, index) => {
                        return (!!item?.recipe_id ? <div onClick={() => navigate('/recipe-detail', { state: { recipe: item?.recipe_id } })} key={index} className='w-full bg-white border border-gray-200 rounded-lg shadow relative'>
                            <HeartButton onClick={(e) => {
                                e.stopPropagation();
                                handleHeartClick({ recipeId: item?.recipe_id?._id })
                            }}
                                isFilled={true} />
                            {displayImage({ image: item?.recipe_id?.thumbnail })}
                            <div className='p-5'>
                                <h2 className='text-xl font-bold'>{item?.recipe_id?.name}</h2>
                                <p className='text-muted'>{item?.recipe_id?.detail}</p>
                            </div>
                        </div> : <></>)
                    }
                    )}
                </div>
            </div>
        </GeneralLayout>
    )
}

export default FavoriteRecipes