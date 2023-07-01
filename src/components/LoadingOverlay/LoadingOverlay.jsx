import React from 'react'
import './LoadingOverlay.css'
import { RiLoader2Line } from 'react-icons/ri'

const LoadingOverlay = () => {
    return (
        <div className="auth__loader">
            <RiLoader2Line size={50} />
        </div>
    )
}

export default LoadingOverlay