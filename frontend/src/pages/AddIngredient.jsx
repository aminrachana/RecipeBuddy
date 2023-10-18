import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import GeneralLayout from '../layouts/GeneralLayout'
import Select from 'react-select'
import ToggleSwitch from '../components/ToggleSwitch'
import { addIngredient } from '../redux/actions/ingredientActions'

const AddIngredient = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            photo: null,
            season: "",
            is_vegetarian: false,
            is_non_vegetarian: false,
            is_egg: false,
            is_dairy: false,
        },
    })

    const submitForm = async (data) => {
        setError()
        setSuccess(false)
        const res = await dispatch(addIngredient({ ...data }))
        if (!res.payload?.success) {
            setError(JSON.parse(res.payload))
            return;
        }
        setSuccess(true)
    }

    const seasonOptions = [
        { value: 'all', label: 'all' },
        { value: 'spring', label: 'spring' },
        { value: 'summer', label: 'summer' },
        { value: 'fall', label: 'fall' },
        { value: 'winter', label: 'winter' },
    ];

    return (
        <GeneralLayout>
            <div className='flex flex-col items-center p-10'>
                <h1 className='text-4xl font-bold'>ADD INGREDIENT</h1>
                <form className='w-full max-w-2xl' onSubmit={handleSubmit(submitForm)}>
                    {error &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
                            <strong className="font-bold">Resolve these issues: </strong>
                            {error?.length ? <ul>
                                {error?.map((item) => <li>{item}</li>)}
                            </ul> :
                                error}
                        </div>}
                    {success &&
                        <div className="bg-teal-100 border border-teal-500 text-teal-900 px-4 py-3 rounded relative my-3" role="alert">
                            <strong className="font-bold">Hooray! </strong>
                            Added successfully
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
                                name="season"
                                control={control}
                                render={({ onChange, value, ref, name, field }) =>
                                    <Select
                                        inputRef={ref}
                                        options={seasonOptions}
                                        value={seasonOptions.find(c => c.value === value)}
                                        onChange={val => field.onChange(val.value)}
                                    />
                                }
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="is_vegetarian"
                                control={control}
                                render={({ field }) =>
                                    <ToggleSwitch field={field} label="Is vegetarian" />
                                }
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="is_non_vegetarian"
                                control={control}
                                render={({ onChange, value, ref, name, field }) =>
                                    <ToggleSwitch field={field} label="Is non vegetarian" />
                                }
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="is_egg"
                                control={control}
                                render={({ field }) =>
                                    <ToggleSwitch field={field} label="Is egg" />
                                }
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="is_dairy"
                                control={control}
                                render={({ field }) =>
                                    <ToggleSwitch field={field} label="Is dairy" />
                                }
                            />
                        </div>
                    </div>

                    <div className='mb-6'>
                        <Controller
                            name="photo"
                            control={control}
                            render={({ field: { value, onChange, ...field }, ref }) =>
                                <Input
                                    {...field}
                                    className='focus:bg-white'
                                    label="Photo"
                                    type="file"
                                    placeholder="Select image"
                                    value={value?.fileName}
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                    }} />}
                        />
                    </div>
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

export default AddIngredient