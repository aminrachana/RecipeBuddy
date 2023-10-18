import React from 'react'
import { twMerge } from 'tailwind-merge'

const Input = ({
    label,
    className,
    type,
    disabled = false,
    ...props
}) => {
    return (
        <>
            {label &&
                <label className="block text-black font-bold mb-2 pr-4" htmlFor="inline-full-name">
                    {label}
                </label>}
            <input
                type={type}
                className={twMerge(`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"`, className)}
                disabled={disabled}
                {...props} />
        </>
    )
}

export default Input