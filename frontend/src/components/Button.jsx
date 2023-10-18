import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({
    className,
    children,
    disabled,
    type = 'button',
    ...props
}) => {
    return (
        <button
            type={type}
            className={twMerge("bg-secondary hover:bg-black text-white text-lg font-bold py-2 px-4 rounded", className)}
            disabled={disabled}
            {...props}>
            {children}
        </button>
    )
}

export default Button