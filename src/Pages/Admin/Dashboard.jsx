import React, { useContext , useState , useEffect } from 'react'
import { UserContext } from '../../Context/userContext'
import axios from 'axios';


const Dashboard = () => {


 const {currentuser}  = useContext(UserContext);  

 const [newMoviesCount, setNewMoviesCount] = useState(0);
 const [totalMovies, setTotalMovies] = useState(0);
 const [topMoviesCount, setTopMoviesCount] = useState(0);

 useEffect(() => {
   const fetchData = async () => {
     try {
       // Fetch all movies data
       const allMoviesRes = await axios.get('https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/movies/all-movies');
       const movies = allMoviesRes.data;

       // Total movies count
       setTotalMovies(movies.length);

       // Calculate average rating for each movie
       const moviesWithAvgRating = movies.map(movie => {
         const totalRating = movie.reviews.reduce((sum, review) => sum + review.rating, 0);
         const avgRating = movie.reviews.length > 0 ? totalRating / movie.reviews.length : 0;
         return { ...movie, avgRating };
       });

       // Sort movies by average rating in descending order to get top movies
       const topMovies = moviesWithAvgRating.sort((a, b) => b.avgRating - a.avgRating).slice(0, 5);
       setTopMoviesCount(topMovies.length);

       // Newly added movies count (assuming sorted by date)
       const newMovies = movies.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
       setNewMoviesCount(newMovies.length);

     } catch (error) {
       console.error('Error fetching dashboard data:', error);
     }
   };

   fetchData();
 }, []);




  return (
    <div className=' float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>
<h1 className='text-white text-[25px] mb-[10px] font-bold'>Welcome {currentuser.username}!!</h1>      
<p className='text-white'>Here, you have all the tools at your fingertips to efficiently manage and oversee your content, user interactions, and site settings. Dive into analytics, handle reviews, update movie details, and customize your site’s functionality to keep things running smoothly. Let’s make every interaction on your platform count!"</p>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-2 mt-[30px]'>

<div className='text-white border text-center p-[5px] rounded-md'>
<h2 className='text-[20px] mb-[10px] font-bold'>Top Movies</h2>
<p className='text-[20px] font-bold'>{totalMovies}</p>  
</div>

<div className='text-white border text-center p-[5px] rounded-md'>
<h2 className='text-[20px] mb-[10px] font-bold'>Total Movies</h2>
<p className='text-[20px] font-bold'>{topMoviesCount}</p>  
</div>

<div className='text-white border text-center p-[5px] rounded-md'>
<h2 className='text-[20px] mb-[10px] font-bold'>Newly Added Movies</h2>
<p className='text-[20px] font-bold'>{newMoviesCount}</p>  
</div>


</div>


    </div>
  )
}

export default Dashboard


