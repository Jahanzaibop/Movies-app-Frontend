import React from 'react'

const Banner = ({image, heading, description}) => {
  return (
    <div>
      
    <img className=' h-auto md:h-[650px] object-cover w-full' src={image} alt=""/>
    
    <div className='p-[20px] max-w-[600px] static lg:absolute top-[200px]'>
    <h1 className='text-[30px] font-bold font-sans text-white mb-[20px]'>{heading}</h1>
    <p className='font-sans text-white'>{description}</p>

    
    </div>
    </div>
  )
}

export default Banner
