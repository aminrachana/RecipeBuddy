import React, { useMemo } from 'react'
import { RiHeartLine, RiHeartFill } from 'react-icons/ri'
import { twMerge } from 'tailwind-merge'

const HeartButton = ({ isFilled, className, onClick }) => {

    const icon = useMemo(() => {
        if (isFilled) {
            return <RiHeartFill color='#E83037' size={24} />
        }
        return <RiHeartLine size={24} />
    }, [isFilled])

    return (
        <button onClick={onClick} className={twMerge('btn rounded-full p-2 bg-white absolute m-2', className)}>
            {icon}
        </button>
    )
}

export default HeartButton