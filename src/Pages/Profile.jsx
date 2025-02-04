import React, {useState , useContext} from 'react'
import { UserContext } from '../Context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  
  const navigate = useNavigate();

  const {currentuser , setCurrentUser} = useContext(UserContext)

  const [formData , setFormData] = useState({
  
    username: currentuser?.username || '',
    email: currentuser?.email || '',
    password: ''

  })
  

  const handleChange = (event) =>{
    setFormData((prev) => ({...prev , [event.target.name] : event.target.value}))
  }


  const handleUpdate = async e =>{
    e.preventDefault();

    const {username,email,password} = formData
   

    if(!username || !email || !password) return toast.error('All Fields Are Required');

    try {
      const response = await axios.put(
          'http://localhost:8000/api/v1/users/profile',
          { username, email , password }, // Exclude password temporarily
          { withCredentials: true } // Ensure credentials (cookies) are sent
      );

      setCurrentUser(response.data)
      toast.success('Profile Updated Successfully');
      setTimeout(() => navigate('/'), 1500);
  }
    catch(error){
      toast.error(error.response ? error.response.data : error.message);
    }

  }


  
  return (
    <div className='mx-auto max-w-[600px] mt-[100px]'>
      <ToastContainer />
      <h1 className=' mb-[20px] text-[30px] font-bold font-sans text-white text-center'>Update Profile</h1>
      <input onChange={handleChange} type="text" value={formData.username} placeholder='Username' name='username' className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' />
      <input onChange={handleChange} type="email" value={formData.email} placeholder='Email' name='email' className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' />
      <input onChange={handleChange} type="password"  placeholder='Password' name='password' className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' />
      <button onClick={handleUpdate} className='p-[5px] w-full bg-white rounded-md font-bold text-lg mt-[20px] '>Update Profile</button>
    </div>
  )
}

export default Profile
