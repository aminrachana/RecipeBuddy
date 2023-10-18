import React, { useEffect, useMemo, useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HeartButton from '../components/HeartButton'
import GeneralLayout from '../layouts/GeneralLayout'
import { getFavorite, toggleFavorite } from '../redux/actions/favoriteActions'
import { deleteRecipe, getRecipe } from '../redux/actions/recipeActions'
import Snackbar from '@mui/material/Snackbar';
import { getIngredient } from '../redux/actions/ingredientActions'
import Button from '../components/Button'
import Input from '../components/Input'

const Recipes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, success, data, error } = useSelector((state) => state.recipe)
    const user = useSelector((state) => state.auth)
    const favorites = useSelector((state) => state.favorite)
    const ingredients = useSelector((state) => state.ingredient)
    const [search, setSearch] = useState("")

    const [filters, setFilters] = useState({
        selectedIngredients: []
    })

    const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false)

    useEffect(() => {
        dispatch(getIngredient())
        dispatch(getRecipe({ filters }))
        if (!!user?.data) {
            dispatch(getFavorite({ userId: user?.data?._id }))
        }
    }, [])

    // Add isLiked field to each recipe based on whether it's in the Favorites array
    const recipesWithLikes = useMemo(() => {
        if (data && data.length) {
            let res = data?.map(recipe => {
                const isLiked = favorites?.data?.some(favorite => favorite?.recipe_id?._id === recipe?._id);
                return {
                    ...recipe,
                    isLiked,
                };
            })

            if (search) {
                return res.filter((recipe) => recipe?.name.toLowerCase().includes(search.toLowerCase()))
            }

            return res;
        }
        return []
    }, [data, favorites, search])

    const displayImage = ({ image }) => {
        const blob = new Blob([new Uint8Array(image.data.data)], { type: image.contentType });
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

    const handleDeleteRecipe = async ({ id }) => {
        setDeleteAlertIsOpen(false)
        const res = await dispatch(deleteRecipe({ id }))

        if (res?.payload?.success) {
            setDeleteAlertIsOpen(true)
            dispatch(getRecipe())
            if (!!user?.data) {
                dispatch(getFavorite({ userId: user?.data?._id }))
            }
        }
    }

    const handleIngredientToggle = ({ ingredient }) => {
        const exist = filters.selectedIngredients?.filter(item => item === ingredient?._id)

        if (exist.length) {
            setFilters({ ...filters, selectedIngredients: filters.selectedIngredients?.filter(item => item !== ingredient?._id) });
        } else {
            setFilters({ ...filters, selectedIngredients: [...filters.selectedIngredients, ingredient?._id] });
        }
    };


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
                <h1 className='text-4xl font-bold'>OUR RECIPES</h1>
                <div className='flex flex-wrap w-full'>
                    <div className='w-full md:w-1/4'>
                        <div className='bg-neutral-200 rounded-lg p-4 mt-10'>
                            <h2 className='text-xl font-bold'>Filters</h2>
                            <Input
                                className='bg-white'
                                type="text"
                                placeholder="Search here"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <h3 className='text-md mt-4 mb-2'>Ingredients</h3>
                            <div className='flex flex-col gap-2'>
                                {ingredients?.success && ingredients?.data && ingredients?.data?.map((item, index) =>
                                    <div key={index} className="flex items-center">
                                        <input id="link-checkbox" type="checkbox"
                                            checked={filters.selectedIngredients?.filter(ingredient_id => ingredient_id === item?._id)?.length}
                                            value={item?._id}
                                            onChange={() => handleIngredientToggle({ ingredient: item })}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium">
                                            {item?.name}
                                        </label>
                                    </div>)}

                                <Button onClick={() => dispatch(getRecipe({ filters }))} className='text-md mt-4'>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full md:w-3/4'>
                        <div className='w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5 mt-5'>
                            {success && !recipesWithLikes?.length &&
                                <span className='text-xl text-neutral-400'>No recipes found</span>
                            }
                            {success && recipesWithLikes && recipesWithLikes?.map((item, index) =>
                                <div onClick={() => navigate('/recipe-detail', { state: { recipe: item } })} key={index} className='w-full bg-white border border-gray-200 rounded-lg shadow relative'>
                                    {user?.userToken &&
                                        <>
                                            <HeartButton onClick={(e) => {
                                                e.stopPropagation();
                                                handleHeartClick({ recipeId: item?._id })
                                            }}
                                                isFilled={item?.isLiked} />

                                            {(user?.data?._id === item?.cook_id || user?.data?.role === 'admin') && <button
                                                type='button'
                                                className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm p-3 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 absolute right-2 top-2'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteRecipe({ id: item?._id })
                                                }}
                                            >
                                                <BsTrash3 className='text-white' />
                                            </button>}
                                        </>}
                                    {displayImage({ image: item?.thumbnail })}
                                    <div className='p-5'>
                                        <h2 className='text-xl font-bold'>{item?.name}</h2>
                                        <p className='text-muted'>{item?.detail}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default Recipes