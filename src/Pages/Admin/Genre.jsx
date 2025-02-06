import React, { useContext } from 'react';
import { MovieContext } from '../../Context/movieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Genre = () => {
  const { genres, setGenres } = useContext(MovieContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/genres/${id}`, {
       
        withCredentials: true,
      });

      // Update the genres list in state after successful deletion
      setGenres(genres.filter((genre) => genre._id !== id));

      toast.success("Genre Has Been Deleted");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white">

<ToastContainer/>

      <h1 className="text-white text-[25px] mb-[10px] font-bold">Genres</h1>
      <ul>
        {genres.length === 0 ? 
        <p className="text-center text-white">
      No Genre Found
      </p> 
        
        :
        genres.map((genre) => (
          <li key={genre._id}>
            {genre.name}{' '}
            <FontAwesomeIcon
              onClick={() => handleDelete("67817132b8277a2f430369e2")} // Correctly wrap the function in an arrow function
              className="cursor-pointer"
              icon={faTrash}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
