import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Button from '../components/Button'
import Input from '../components/Input'
import GeneralLayout from '../layouts/GeneralLayout'
import { addIngredient, getIngredient } from '../redux/actions/ingredientActions'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'
import { addRecipe } from '../redux/actions/recipeActions'

const AddRecipe = () => {
    const ingredients = useSelector((state) => state.ingredient)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [error, setError] = useState()
    const user = useSelector((state) => state.auth)
    
    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            detail: "",
            country: "",
            photoImages: "",
            thumbnailImage: "",
            steps: ["Step 1"],
            ingredients_qty: [
                { ingredient_id: null, quantity: null }
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients_qty',
    });

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: 'steps',
    });

    const submitForm = async (data) => {
        setError()
        console.log('data >>', data);

        const errorIngredients = data?.ingredients_qty.filter(ingredient => ingredient.ingredient_id === null || ingredient.quantity === null);

        if (errorIngredients.length > 0) {
            let errors = [];
            data?.ingredients_qty.map((ingredient, index) => {
                if (ingredient.ingredient_id === null || ingredient.quantity === null)
                    errors.push(`Ingredient ${index + 1}: has null value`)
            });
            setError(errors);
            return;
        }

        let errors = [];
        data?.steps.map((step, index) => {
            if (!step)
                errors.push(`Step ${index + 1}: is empty`)
        });
        if (errors.length) {
            setError(errors);
            return;
        }


        const res = await dispatch(addRecipe({ ...data, cook_id: user?.data?._id }))
        console.log('res ', res);
        if (!res.payload?.success) {
            setError(JSON.parse(res.payload))
            return;
        }
        navigate('/recipes')
    }

    useEffect(() => {
        dispatch(getIngredient())
    }, [])

    const ingredientOptions = useMemo(() => {
        let ingredientArr = [];
        if (ingredients?.data) {
            ingredients?.data?.map((item) => ingredientArr.push({ value: item?._id, label: item?.name }))
        }
        return ingredientArr
    }, [ingredients])

    console.log('error ', error);
    return (
        <GeneralLayout>
            <div className='flex flex-col items-center p-10'>
                <h1 className='text-4xl font-bold'>ADD RECIPE</h1>
                <form className='w-full max-w-2xl' onSubmit={handleSubmit(submitForm)}>
                    {error &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
                            <strong className="font-bold">Resolve these issues: </strong>
                            {error?.length ? <ul>
                                {error?.map((item) => <li>{item}</li>)}
                            </ul> :
                                error}
                        </div>}
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, ref }) =>
                                    <Input
                                        className='focus:bg-white'
                                        label="Name"
                                        type="text"
                                        placeholder="Enter name"
                                        {...field} />}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="detail"
                                control={control}
                                render={({ field, ref }) =>
                                    <Input
                                        className='focus:bg-white'
                                        label="Detail"
                                        type="text"
                                        placeholder="Enter detail"
                                        {...field} />}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="country"
                                control={control}
                                render={({ field, ref }) =>
                                    <Input
                                        className='focus:bg-white'
                                        label="Country"
                                        type="text"
                                        placeholder="Enter country"
                                        {...field} />}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="photoImages"
                                control={control}
                                render={({ field: { value, onChange, ...field }, ref }) =>
                                    <Input
                                        {...field}
                                        className='focus:bg-white'
                                        label="Photos"
                                        type="file"
                                        placeholder="Enter photos"
                                        value={value?.fileName}
                                        onChange={(event) => {
                                            onChange(event.target.files[0]);
                                        }} />}
                            />
                        </div>
                    </div>

                    <div className='mb-6'>
                        <Controller
                            name="thumbnailImage"
                            control={control}
                            render={({ field: { value, onChange, ...field }, ref }) =>
                                <Input
                                    {...field}
                                    className='focus:bg-white'
                                    label="Thumbnail"
                                    type="file"
                                    placeholder="Select thumbnail"
                                    value={value?.fileName}
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                    }} />}
                        />
                    </div>

                    <label className="block text-black font-bold mb-2 pr-4">
                        Ingredients
                    </label>
                    {fields.map((item, index) => (
                        <div className='mb-6 flex justify-between' key={item.id}>
                            {ingredientOptions && (
                                <div className='flex-1'>
                                    <Controller
                                        name={`ingredients_qty[${index}].ingredient_id`}
                                        control={control}
                                        defaultValue='' // Set a default value
                                        render={({ field }) => (
                                            <Select
                                                placeholder='Select ingredient'
                                                options={ingredientOptions}
                                                value={ingredientOptions.find((c) => c.value === field.value)}
                                                onChange={(val) => {
                                                    field.onChange(val.value);
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            )}
                            <div className='flex-1 ms-3'>
                                <Controller
                                    name={`ingredients_qty[${index}].quantity`}
                                    control={control}
                                    defaultValue='' // Set a default value
                                    render={({ field }) => (
                                        <Input
                                            className='focus:bg-white'
                                            type='text'
                                            placeholder='Enter quantity'
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <div className='mx-3'>
                                <button
                                    type='button'
                                    className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm p-3 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                    onClick={() => append({ ingredient_id: null, quantity: null })} // Use append to add a new item
                                >
                                    <AiOutlinePlus className='text-white' />
                                </button>
                                {index > 0 &&
                                    <button
                                        type='button'
                                        className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm p-3 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                        onClick={() => remove(index)} // Use remove to delete an item
                                    >
                                        <BsTrash3 className='text-white' />
                                    </button>}
                            </div>
                        </div>
                    ))}
                    <label className="block text-black font-bold mb-2 pr-4">
                        Steps
                    </label>
                    {stepFields?.map((item, index) => (
                        <div className='mb-6 flex justify-between' key={item.id}>
                            <div className='flex-1'>
                                <Controller
                                    name={`steps[${index}]`}
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <Input
                                            className='focus:bg-white'
                                            type='text'
                                            placeholder='Enter step'
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            <div className='mx-3'>
                                <button
                                    type='button'
                                    className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm p-3 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                    onClick={() => appendStep("")}
                                >
                                    <AiOutlinePlus className='text-white' />
                                </button>
                                {index > 0 &&
                                    <button
                                        type='button'
                                        className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm p-3 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                        onClick={() => removeStep(index)}
                                    >
                                        <BsTrash3 className='text-white' />
                                    </button>}
                            </div>
                        </div>
                    ))}

                    <div>
                        <Button type='submit'
                        // disabled={loading}
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </GeneralLayout>
    )
}

export default AddRecipe