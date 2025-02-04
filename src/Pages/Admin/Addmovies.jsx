import React, { useContext, useState } from "react";
import { MovieContext } from "../../Context/movieContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const Addmovies = () => {
  const { genres , setMovies } = useContext(MovieContext); // Get the genres from context
  const [input, setInput] = useState({
    name: "",
    image: "",
    year: "",
    genre:"", 
    director: "",
    detail: "",
    cast: [], // Array for storing cast
  });
  const [actor, setActor] = useState(""); // For individual actor input

  const navigate = useNavigate(); // For navigation after successful movie addition

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the field based on input name
    }));
  };

  // Handle adding a single actor
  const handleAddActor = () => {
    if (!actor.trim()) {
      alert("Please enter a valid actor name.");
      return;
    }
    setInput((prev) => ({
      ...prev,
      cast: [...prev.cast, actor.trim()], // Add the new actor to the cast array
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

      const response = await axios.post(
        "http://localhost:8000/api/v1/movies/add-movie",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies
        }
      );

      const newMovie = response.data;

      
      setMovies((prevMovies) => [...prevMovies, newMovie]);

      toast.success("Movie added successfully!");
      
      setTimeout(()=>{
        navigate("/admin/movies");
      },1500)

       
    } catch (error) {
      toast.error("Failed to add movie. Please try again.");
    }
  };

 

  return (
    <div className='float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>

     <ToastContainer/>

      <h1 className="text-white text-[25px] mb-[10px] font-bold text-center">Add Movies</h1>

      <div className="max-w-[500px] m-auto">
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Image"
          name="image"
          onChange={handleChange}
        />
        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Year"
          name="year"
          onChange={handleChange}
        />

        <input
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white"
          type="text"
          placeholder="Director"
          name="director"
          onChange={handleChange}
        />

<select
    className="bg-transparent border rounded p-[5px] w-full mb-[10px]"
    name="genre"
    onChange={handleChange}
    value={input.genre}
  >
    <option className="text-[#000]" value="">Select Genre</option>
    {genres.map((genre) => (
      <option className="text-[#000]" key={genre._id} value={genre._id}>
        {genre.name}
      </option>
    ))}
  </select>

        <textarea
          className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white h[100px]"
          placeholder="Details"
          name="detail"
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
                    <FontAwesomeIcon icon={faTrash}/>
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
          Add Movie
        </button>
      </div>
    </div>
  );
};

export default Addmovies;
