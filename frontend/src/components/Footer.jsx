import React from 'react'

const Footer = () => {
    return (
        <footer className="p-6 bg-black">
            <div className="container grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
                <div className="flex flex-col space-y-4">
                    <h1 className='text-2xl text-white font-bold '>Recipe Buddy</h1>
                    <div className="text-white text-lg">
                        <p>We have great variety of recipes</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="text-white text-xl font-medium">Pages</h2>
                    <div className="flex flex-col space-y-2 text-white text-lg">
                        <a href="#">Home</a>
                        <a href="#">Recipes</a>
                        <a href="#">Favorites</a>
                        <a href="#">About</a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="text-white text-xl font-medium">Get in touch</h2>
                    <div className="flex flex-col space-y-2 text-white text-lg">
                        <a href="#">+1 888-888-8888</a>
                        <a href="#">info@recipebuddy.com</a>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <h2 className="text-white text-xl font-medium">Follow us</h2>
                    <div className="flex flex-col space-y-2 text-white text-lg">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center px-6 pt-12">
                <span className="text-white text-lg">© Copyright 2023. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer