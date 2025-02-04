import React, { useContext } from 'react';
import { MovieContext } from '../../Context/movieContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Movies = () => {
  const { movies, setMovies, genres } = useContext(MovieContext);


  const deleteMovie = async(id)=>{

   

  try{
   
     await axios.delete(`https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/movies/delete-movie/${id}` ,   {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include cookies
    })
  
    setMovies(movies.filter((movie) => movie._id !== id))
    
    toast.success("Movie Removed Successfully");
  
  
  }

  catch(error){
    console.error(error);
  }
   

  }

  const handleDelete = (id)=>{
   
    deleteMovie(id);

  }





  return (
    <div className='float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>
      <ToastContainer/>
      
      <h1 className="text-white text-[25px] mb-[10px] font-bold">Movies</h1>

      <div>
        {movies.length === 0 ? (
          <p className="text-center text-white">No Movies Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#141212] border overflow-hidden">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Movies</th>
                  <th className="py-3 px-4 text-left">Genres</th>
                  <th className="py-3 px-4 text-left">Year</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie , index) => {
                  let genreNames;
                  if (Array.isArray(movie.genre)) {
                    // If movie.genre is an array, map over it
                    genreNames = movie.genre
                      .map((id) => genres.find((genre) => genre._id === id)?.name)
                      .filter(Boolean) // Filter out undefined values in case of unmatched IDs
                      .join(', ');
                  } else {
                    // If movie.genre is a single ID, find the genre name directly
                    genreNames = genres.find((genre) => genre._id === movie.genre)?.name || 'N/A';
                  }

                  return (
                    <tr key={movie._id} className={`border-b hover:bg-[#181717] ${
                      index % 2 === 0 ? 'bg-[#222222]' : 'bg-[#0b0909]'
                    }` }>
                      <td className="py-3 px-4">{movie.name}</td>
                      <td className="py-3 px-4">{genreNames}</td>
                      <td className="py-3 px-4">{movie.year}</td>
                      <td className="py-3 px-4 text-center">
                        <button className="bg-blue-500 w-full sm:w-auto mb-[10px] hover:bg-blue-700 text-white py-1 px-3 rounded mr-2">
                         <Link to={`/admin/update-movie/${movie._id}`} >Edit</Link> 
                        </button>
                        <button onClick={() => handleDelete(movie._id)} className=" w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
