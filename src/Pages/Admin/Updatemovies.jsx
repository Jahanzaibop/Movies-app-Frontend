import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../Context/movieContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UpdateMovies = () => {
  const { id } = useParams();
  const { genres, movies, setMovies } = useContext(MovieContext); // Access genres and movies
  const [input, setInput] = useState({
    name: "",
    image: "",
    year: "",
    genre: "",
    director: "",
    detail: "",
    cast: [], // Array for storing cast
  });
  const [actor, setActor] = useState(""); // For individual actor input
  const navigate = useNavigate();

  // Load existing movie details into the form
  useEffect(() => {
    const movieToEdit = movies.find((movie) => movie._id === id);
    if (movieToEdit) {
      setInput({
        name: movieToEdit.name || "",
        image: movieToEdit.image || "",
        year: movieToEdit.year || "",
        genre: movieToEdit.genre || "",
        director: movieToEdit.director || "",
        detail: movieToEdit.detail || "",
        cast: movieToEdit.cast || [],
      });
    }
  }, [id, movies]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a single actor
  const handleAddActor = () => {
    if (!actor.trim()) {
      toast.error("Please enter a valid actor name.");
      return;
    }
    setInput((prev) => ({
      ...prev,
      cast: [...prev.cast, actor.trim()],
    }));
    setActor(""); // Clear the input field
  };

  // Handle form submission
  const handleClick = async () => {
    try {
      if (!input.genre.length) {
        toast.error("Please select at least one genre.");
        return;
      }

      if (!input.cast.length) {
        toast.error("Please add at least one actor to the cast.");
        return;
      }

      const response = await axios.put(
        `https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/movies/update-movie/${id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedMovie = response.data;

      // Update the movie in the movies list
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === id ? updatedMovie : movie
        )
      );

      toast.success("Movie updated successfully!");
      setTimeout(() => {
        navigate("/admin/movies");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update movie. Please try again.");
    }
  };

  // Handle deleting an actor from the cast
const deleteActor = (actorToDelete) => {
  setInput((prev) => ({
    ...prev,
    cast: prev.cast.filter((actor) => actor !== actorToDelete),
  }));

 
};


  return (
    <div className='float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>
      <ToastContainer />
      <h1 className="text-white text-[25px] mb-[10px] font-bold text-center">
        Update Movie
      </h1>

      <div className="max-w-[500px] m-auto">
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Image"
          name="image"
          value={input.image}
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Year"
          name="year"
          value={input.year}
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Director"
          name="director"
          value={input.director}
          onChange={handleChange}
        />

        <select
          className="bg-transparent border rounded p-[5px] w-full mb-[10px]"
          name="genre"
          value={input.genre}
          onChange={handleChange}
        >
          <option className="text-[#000]" value="">
            Select Genre
          </option>
          {genres.map((genre) => (
            <option
              className="text-[#000]"
              key={genre._id}
              value={genre._id}
            >
              {genre.name}
            </option>
          ))}
        </select>

        <textarea
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white h[100px]"
          placeholder="Details"
          name="detail"
          value={input.detail}
          onChange={handleChange}
        ></textarea>

        {/* Add cast section */}
        <div className="bg-transparent border rounded p-[5px] w-full mb-[10px]">
          <label className="block mb-[5px]">Add Cast:</label>
          <div className="flex items-center mb-[10px]">
            <input
              className="bg-transparent border rounded p-[5px] flex-1 placeholder:text-white"
              type="text"
              placeholder="Actor Name"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
            />
            <button
              className="bg-[#000] border rounded p-[5px] ml-[10px]"
              onClick={handleAddActor}
            >
              Add
            </button>
          </div>

          {/* Display cast */}
  {input.cast.length > 0 && (
    <div className="bg-[#2d2d2d] p-[10px] rounded">
      <h3 className="text-[18px] font-bold">Cast:</h3>
      <ul>
        {input.cast.map((actor, index) => (
          <li key={index} className="mb-[5px]">
            {actor}
            <FontAwesomeIcon
              className="float-right cursor-pointer"
              icon={faTrash}
              onClick={() => deleteActor(actor)} 
            />
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

        <button
          onClick={handleClick}
          className="bg-[#000] border rounded p-[5px] w-full mb-[10px]"
        >
          Update Movie
        </button>
      </div>
    </div>
  );
};

export default UpdateMovies;
