import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../Context/movieContext';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faStar, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../Context/userContext';
import { AdminContext } from '../Context/adminContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const Moviedetails = () => {
  const { movies = [], genres = [] } = useContext(MovieContext) || {};
  const { currentuser } = useContext(UserContext);
  const { reviews = [], updateMovieId, setReviews } = useContext(AdminContext);
  const { id } = useParams();
  
  const [rating, setRating] = useState({
    userId: currentuser ? currentuser._id : null,
    rating: '',
    comment: '',
    
  });

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating((totalRating / reviews.length).toFixed(1));
    } else {
      setAverageRating(0);
    }
  }, [reviews]);
  
  const movie = movies.find((r) => r._id === id);
  const genre = genres.find((g) => g._id === movie?.genre);
  const genreName = genre ? genre.name : 'Unknown Genre';

  useEffect(() => {
    if (id) {
      updateMovieId(id);
    }
  }, [id, updateMovieId]);

  const handleChange = (e) => {
    setRating((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,  // Correctly set name and value pair
    }));
  };

  const handleSubmit = async () => {

    if(!rating.rating || !rating.comment){
      return toast.error('All Fields Are Required');
    }

    try {
      await axios.post(`http://localhost:8000/api/v1/movies/${id}/reviews`, rating, {
        withCredentials: true
      });
  
      // Update reviews to include the current review with user's name
      setReviews((prevReviews) => [
        ...prevReviews,
        { ...rating, name: currentuser.username } // Add the current user's name to the review
      ]);
  
      setRating({ ...rating, rating: '', comment: '' }); // Reset the form fields if needed

      toast.success("Review Has Been Added")

    } catch (error) {
      toast.error('You Have Already Added A Review For This Movie');
    }
  };
  

  const similarMovies = movies
    .filter((m) => m.genre === movie.genre && m._id !== movie._id)
    .slice(0, 4);

  if (!movie) return <p>No Movies Found</p>;

  return (
    <>
    <div className="mx-[auto] max-w-[1200px] mt-[50px]">
      <ToastContainer/>
      
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="px-[10px]">
          <img className="w-full rounded-md" src={movie.image} alt={movie.name} />
        </div>
        <div className="px-[10px] text-white">
          <h1 className="font-extrabold text-[30px] mb-[10px]">{movie.name}</h1>
          <p>{movie.detail}</p>
          <div className="grid grid-cols-3 gap-2 mt-[20px]">
            <p className="font-bold">{genreName}</p>
            <p className="font-bold">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-[10px]" /> {movie.year}
            </p>
            <p className="font-bold">
  <FontAwesomeIcon icon={faStar} className="mr-[10px]" /> {averageRating} 
</p>
          </div>
          <div className="mt-[10px]">
          <h2 className="font-extrabold text-[22px] mb-[10px]">Director</h2>
          <p  className="border-b mb-[10px] pb-[10px] text-[17px] font-bold">
                <FontAwesomeIcon icon={faUserCircle} className="mr-[10px]" /> {movie.director}
              </p>
            <h2 className="font-extrabold text-[22px] mb-[10px]">Cast</h2>
            {movie.cast.map((actor, index) => (
              <p key={index} className="border-b mb-[10px] pb-[10px] text-[17px] font-bold">
                <FontAwesomeIcon icon={faUserCircle} className="mr-[10px]" /> {actor}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-extrabold px-[10px] lg:px-0 text-[24px] mb-[20px]">Similar Movies</h2>
          <div className="grid grid-cols-2">
            {similarMovies.map((similarMovie) => (
              <div key={similarMovie._id} className="rounded-md p-[10px] text-center">
                <Link to={`/movies/${similarMovie._id}`}>
                  <img className="w-full rounded-md mb-[10px]" src={similarMovie.image} alt={similarMovie.name} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[50px] px-[10px] lg:px-0">
        <h2 className="font-extrabold text-[25px] mb-[20px] text-white">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-[20px]">
              <p className="text-white font-bold">
                <FontAwesomeIcon icon={faUserCircle} className="mr-[10px]" /> {review.name} - {review.rating} Stars
              </p>
              <p className="text-white mt-[10px]">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No reviews for this movie yet.</p>
        )}
      </div>

      <div className="mt-[50px] px-[10px] lg:px-0">
        {currentuser ? (
          <div>
            <select
              value={rating.rating}
              onChange={handleChange}
              className="w-full border bg-transparent mb-[10px] rounded-md px-[10px] text-white"
              name="rating"
            >
              <option className="text-black" value="">
                Select Rating
              </option>
              <option className="text-black" value="1">
                1 Star
              </option>
              <option className="text-black" value="2">
                2 Stars
              </option>
              <option className="text-black" value="3">
                3 Stars
              </option>
              <option className="text-black" value="4">
                4 Stars
              </option>
              <option className="text-black" value="5">
                5 Stars
              </option>
            </select>

            <textarea
              name="comment"
              onChange={handleChange}
              value={rating.comment}
              className="w-full border bg-transparent mb-[10px] rounded-md px-[10px] text-white placeholder:text-white"
              placeholder="Comment"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="p-[5px] bg-white rounded-md font-extrabold max-w-[150px] w-full text-center mr-[10px]"
            >
              Submit
            </button>
          </div>
        ) : (
          <p className="text-white center">You Need to Register to review Movie</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Moviedetails;