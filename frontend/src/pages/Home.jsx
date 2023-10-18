import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import GeneralLayout from '../layouts/GeneralLayout'

const Home = () => {
    const navigate = useNavigate()

    const handleGetStarted = () => {
        navigate("/recipes")
    }

    return (
        <GeneralLayout>
            <div className='banner w-full h-[600px] object-cover flex items-center justify-center'>
                <div className='bg-secondary px-4 py-12 rounded-xl'>
                    <h1 className="text-4xl font-bold mb-4">Welcome to Delicious Recipes</h1>
                    <p className="text-lg mb-2">
                        Explore a world of mouthwatering recipes, cooking tips, and culinary inspiration.
                    </p>
                    <p className="text-lg mb-8">
                        Whether you're a seasoned chef or a beginner in the kitchen, our collection of recipes has something for everyone.
                    </p>
                    <Button onClick={() => handleGetStarted()} className='bg-primary'>Get started</Button>
                </div>
            </div>
        </GeneralLayout>
    )
}

export default Home