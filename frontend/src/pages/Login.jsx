import React, { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../components/Button'
import Input from '../components/Input'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/authActions'
import AuthLayout from '../layouts/AuthLayout'

const Login = () => {
    const { loading, success, userToken } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const submitForm = async (data) => {
        setError()
        const res = await dispatch(loginUser(data))
        if(!res?.payload?.token){
            setError(res?.payload)
        }
    }

    useMemo(() => {
        console.log('success ', success);
        console.log('userToken ', userToken);
        if (success && userToken) {
            navigate("/");
        }
    }, [loading, success])

    return (
        <>
            <AuthLayout
                title='Login'
                link='/auth/register'
                linkName='Go to register'>
                <form className="w-full max-w-lg" onSubmit={handleSubmit(submitForm)}>
                    {error &&
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3" role="alert">
                            <strong className="font-bold">Oops! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>}
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

                    <div className="">
                        <div>
                            <Button type='submit' disabled={loading}>
                                Sign In
                            </Button>
                        </div>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}

export default Login