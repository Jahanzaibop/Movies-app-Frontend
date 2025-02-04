import React, {useState , useContext} from 'react'
import axios from 'axios'
import { MovieContext } from '../../Context/movieContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Addgenre = () => {


  const navigate = useNavigate();
 
 const [input , setInput] = useState({
    name:'',
 })   




 const {setGenres} = useContext(MovieContext);


 const handleChange = (e)=>{
  
  setInput((prev) =>({...prev , [e.target.name] : e.target.value}))

  

 }

 const handleClick = async (e) => {
  e.preventDefault();

  if (!input.name) {
    return toast.error("Genre can't be empty");
  }

  try {
    const response = await axios.post(
      "https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/genres",
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const newGenre = response.data;

    setGenres((prev) => [...prev, newGenre]);

    toast.success("Genre added successfully!");

    setTimeout(()=>{
     
      navigate("/admin/genres");

    },1500)

  } catch (err) {
    if (err.response && err.response.status === 409) {
      // Genre already exists
      toast.error(err.response.data.error || "Genre already exists");
    } else {
      // General error
      toast.error("Something went wrong");
    }
  }
};

 
    return (
    <div className='float-left lg:float-none pl-[15px] p-[15px]  lg:pl-[293px] w-[100%] lg:p-[25px] bg-[#000] text-white'>
      <ToastContainer/>
      <h1 className="text-white text-[25px] mb-[10px] font-bold text-center"> Add Genre</h1>
      <div className="max-w-[500px] m-auto">
      <input className="bg-transparent border rounded p-[5px] w-full mb-[10px] placeholder:text-white" type='text' name="name" onChange={handleChange} placeholder='Add Genre'/>
      <button  className="bg-[#000] border rounded p-[5px] w-full" onClick={handleClick}>Add Genre</button>
      </div>
    </div>
  )
}

export default Addgenre
