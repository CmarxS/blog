"use client" // Declaração para uso do cliente

import { ButtonHTMLAttributes, PropsWithChildren, MouseEvent, useCallback } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
    handleClick?: (e?: MouseEvent<HTMLButtonElement>) => void 
    backgroundColor?: string 
    textColor?: string 
}

const Button = ({ children, handleClick, disabled, className = '', backgroundColor = 'green', textColor = 'white', ...props }: ButtonProps) => {
    const onHandleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        if (handleClick instanceof Function && !disabled) {
            handleClick(e)
        }
    }, [handleClick, disabled]) 

    return (
        <button
            {...props} 
            onClick={onHandleClick} 
            className={`px-4 py-2 text-${textColor} rounded ${disabled ? 'bg-gray-300 cursor-not-allowed' : `bg-${backgroundColor}-500 hover:bg-${backgroundColor}-700`} ${className}`} 
            disabled={disabled} 
        >
            {children} 
        </button>
    )
}

export default Button 