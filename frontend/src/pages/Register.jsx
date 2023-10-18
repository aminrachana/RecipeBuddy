import React, { useMemo, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { registerUser } from '../redux/actions/authActions'
import Select from 'react-select'

const Register = () => {
    const { loading, success, userToken } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "",
        },
    })

    const submitForm = async (data) => {
        setError()
        const res = await dispatch(registerUser(data))
        console.log('res ', res);
        if (!res?.payload?.token) {
            setError(res?.payload)
        }
    }

    useMemo(() => {
        if (success && userToken) {
            navigate("/");
        }
    }, [loading, success])

    const roleOptions = [
        { value: 'general', label: 'General' },
        { value: 'cook', label: 'Cook' },
    ]

    return (
        <>
            <AuthLayout
                title='Register'
                link='/auth/login'
                linkName='Go to login'>
                <form className="w-full max-w-lg" onSubmit={handleSubmit(submitForm)}>
                    {error &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>}
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) =>
                                    <Input
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
                                name="email"
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        label="Email"
                                        type="text"
                                        placeholder="Enter email"
                                        {...field} />}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        label='Password'
                                        type="password"
                                        placeholder="******************"
                                        {...field} />}
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div>
                            <Controller
                                name={`role`}
                                control={control}
                                defaultValue=''
                                render={({ field }) => (
                                    <Select
                                        placeholder='Select role'
                                        options={roleOptions}
                                        value={roleOptions.find((c) => c.value === field.value)}
                                        onChange={(val) => {
                                            field.onChange(val.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <Button type='submit'>
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}

export default Register