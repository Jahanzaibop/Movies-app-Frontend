import React, { useContext , useState } from 'react'
import Banner from '../Components/Banner'
import { MovieContext } from '../Context/movieContext'
import { Link } from 'react-router-dom'




const Home = () => {
 
const {genres , movies} = useContext(MovieContext);  

const [selectedGenre , setSelectedGenre]  = useState(null)

const filteredMovies = selectedGenre ? movies.filter((movie) => movie.genre === selectedGenre ) : movies
 
 
 
  return (
    <div>
      <Banner  heading={'Unleash the Magic of Cinema – Your Gateway to Movies, Anytime, Anywhere!'} image={'/banner.jpg'} description={'Welcome to Movie.io, your ultimate destination for discovering the world of movies. Whether you re a fan of timeless classics, the latest blockbusters, or indie gems, we have something for every movie lover. Explore an ever-expanding collection of films, dive into detailed reviews, watch trailers, and find recommendations tailored to your taste. From action-packed thrillers to heartwarming dramas, we bring the magic of cinema right to your screen. Start your movie journey today and never miss a moment of cinematic brilliance!'}/>
      
      <div className='mx-auto flex items-center justify-start mt-[50px] overflow-x-auto custom-scrollbar pb-[20px] px-4'>
      
      <button
          onClick={() => setSelectedGenre(null)}
          className={`tracking-wide border uppercase rounded-md px-[22px] py-[10px] font-extrabold mx-[10px] ${!selectedGenre ? 'bg-gray-200 text-black' : 'text-white'}`}
        >
          All
        </button>
      
      
      {
        genres.map((genre,index) =>(
        


        <button 
        key={genre._id || index } 
        onClick={()=> setSelectedGenre(genre._id)}
        className={`tracking-wide border uppercase rounded-md px-[22px] py-[10px] font-extrabold mx-[10px] ${selectedGenre === genre._id ? 'bg-gray-200 text-black' : 'text-white'}` } 
        >
        {genre.name}
        </button>  
          
        ))
        
}
</div>

<div className='mx-auto max-w-[1200px]'>
<div className='grid grid-cols-2 lg:grid-cols-5 mt-[50px]'>

{
  filteredMovies.map((movie,index) =>(
    <div key={movie._id || index} className='mx-[10px]'>
  <Link to={`/movies/${movie._id}`} ><img className='w-full h-auto lg:h-[330px] object-cover rounded-md ' src={movie.image} alt={movie.image}/></Link>

    </div>

   

    ))
}
</div>
</div>

    </div>
  )
}

export default Home
