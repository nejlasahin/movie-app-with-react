import React from 'react'
import image from '../assets/error.gif'

function Error() {
    return (
        <>
            <img className='img-fluid mx-auto d-block pt-5 pb-40' src={image} alt="404-error"/>
        </>
    )
}

export default Error