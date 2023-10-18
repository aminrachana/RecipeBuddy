import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GeneralLayout from '../layouts/GeneralLayout'
import { addComment, getComments } from '../redux/actions/commentActions';
import { addRating, getRatings } from '../redux/actions/ratingActions';
import moment from 'moment';
import Input from '../components/Input';
import Button from '../components/Button';
import Rating from '@mui/material/Rating';

const RecipeDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { recipe } = location.state;
    const comments = useSelector((state) => state.comment)
    const ratings = useSelector((state) => state.rating)
    const user = useSelector((state) => state.auth)

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')

    useEffect(() => {
        console.log('recipe?._id ', recipe?._id);
        dispatch(getRatings({ recipeId: recipe?._id }))
        dispatch(getComments({ recipeId: recipe?._id }))
    }, [])

    const displayImage = ({ image }) => {
        const blob = new Blob([new Uint8Array(image?.data?.data)], { type: image?.contentType });
        const imageUrl = URL.createObjectURL(blob);

        return (
            <div>
                <img src={imageUrl} alt="Recipe Thumbnail" className='h-[250px] sm:h-[300px] md:h-[450px] w-full object-cover rounded-lg' />
            </div>
        );
    }

    const displayIngredient = ({ image }) => {
        const blob = new Blob([new Uint8Array(image?.data?.data)], { type: image?.contentType });
        const imageUrl = URL.createObjectURL(blob);

        return (
            <div>
                <img src={imageUrl} alt="Ingredient" className='h-[50px] w-[50px] md:h-[100px] md:w-[100px] object-cover rounded-full' />
            </div>
        );
    }

    const handleAddRating = async () => {
        const res = await dispatch(addRating({ userId: '651ec3e352ea910ef53b6634', recipeId: '651dac635a04d8465519349d', rating_stars: rating }))
        if (res?.payload?.success) {
            setRating(0);
            dispatch(getRatings({ recipeId: recipe?._id }))
        }
    }

    const handleAddComment = async () => {
        const res = await dispatch(addComment({ userId: '651ec3e352ea910ef53b6634', recipeId: '651dac635a04d8465519349d', comment }))
        if (res?.payload?.success) {
            setComment('')
            dispatch(getComments({ recipeId: recipe?._id }))
        }
    }

    return (
        <GeneralLayout>
            <main className='container m-auto'>
                <div className='flex items-center p-10'>
                    <div className='flex-1'>
                        <h1 className='text-3xl font-bold'>{recipe.name}</h1>
                        <p>{recipe.detail}</p>
                    </div>
                    {displayImage({ image: recipe?.thumbnail })}
                </div>
                <div className='m-5'>
                    <h2 className='text-2xl font-bold mb-4'>Steps</h2>
                    {recipe.steps.map((item, index) =>
                        <div className="bg-neutral-100 p-3 rounded-md">
                            <h4 className='font-bold mb-3'>Step {index + 1}</h4>
                            <hr />
                            <p className='mt-4'>{item}</p>
                        </div>
                    )}
                </div>
                <div className='m-5'>
                    <h2 className='text-2xl font-bold mb-4'>Ingredients</h2>
                    <div className='flex gap-5'>
                        {recipe?.ingredients?.map((item, index) =>
                            <div key={index} className='bg-neutral-100 p-4 rounded-xl'>
                                {displayIngredient({ image: item?.ingredient_id?.photo })}
                                <h3 className='text-xl'>{item?.ingredient_id?.name}</h3>
                                <p className='font-bold'>{item?.quantity}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='m-5'>
                    <h2 className='text-2xl font-bold mb-4'>Ratings</h2>
                    {user?.userToken &&
                        <>
                            <label className="block text-black font-bold mb-2 pr-4">
                                Choose rating
                            </label>
                            <div className='flex items-center'>
                                <Rating name="rating" value={rating} onChange={(e, val) => setRating(val)} size="large" />
                                <Button className='ms-3' disabled={!rating} onClick={handleAddRating}>Post</Button>
                            </div>
                        </>}
                    <div className="flex items-center mt-4">
                        {ratings &&
                            <Rating name="read-only" value={ratings.ratingsAvg} size="large" readOnly />}
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{ratings?.ratingsAvg} out of 5</p>
                    </div>
                </div>

                <div className='m-5'>
                    <h2 className='text-2xl font-bold mb-4'>Comments</h2>
                    {user?.userToken &&
                        <div className='max-w-md'>
                            <Input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                label='Enter comment'
                                type='text' />
                            <Button className='mt-3' disabled={!comment} onClick={handleAddComment}>Post</Button>
                        </div>}
                    <div className='flex flex-col gap-5 mt-5'>
                        {comments?.data?.length > 0 && comments?.data?.map((item, index) =>
                            <div className='flex items-center w-full'>
                                <div className='bg-cyan-500 h-[50px] w-[50px] flex items-center justify-center rounded-full text-white'>{`${item?.user_id?.name[0]}${item?.user_id?.name[1]}`}</div>
                                <div key={index} className='bg-neutral-100 p-4 rounded-xl'>
                                    <p>{item?.comment}</p>
                                    <div className='flex items-center justify-between'>
                                        <span className="font-semibold">{item?.user_id?.name}</span>
                                        <span className='ms-5 text-neutral-500'>{moment(item?.createdAt).format('DD-MM-YYYY')}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </GeneralLayout>
    )
}

export default RecipeDetail