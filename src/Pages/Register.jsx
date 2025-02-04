import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer , toast } from 'react-toastify'




const Register = () => {
 
 const navigate = useNavigate();   

   const [user , setUser] = useState({
    
    username:'',
    email:'',
    password:''
    
}) 

const handleChange = (e)=>{
    
setUser((prev) => ({...prev , [e.target.name] : e.target.value }) );
 

}


const handleClick = async e =>{

    e.preventDefault();

    if(!user.username || !user.email || !user.password) return toast.error('All Fields Are Required');

    try{
    
    await axios.post("http://localhost:8000/api/v1/users" , user);
    toast.success("User Has Been Registered Sucessfully")
    setTimeout(()=> navigate('/login'), 1500)
    
    
}
    catch(error){
        if (error.response && error.response.status === 400) {
            toast.error(error.response.data);  // This will display "User already exists" if that's the server response
          } 

    }


}


 
    return (
    <div className='mx-auto max-w-[600px] mt-[100px]'>
    <ToastContainer/>
      <h1 className=' mb-[20px] text-[30px] font-bold font-sans text-white text-center'>Register</h1>
      <input onChange={handleChange} name="username" className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' type='text' placeholder='Username' />
      <input onChange={handleChange} name="email" className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' type='email' placeholder='Email'/>
      <input onChange={handleChange} name="password" className='bg-transparent border text-white placeholder:text-white w-full mb-[20px]  p-[5px] rounded-md' type='password' placeholder='Password'/>
      <button onClick={handleClick} className='p-[5px] w-full bg-white rounded-md font-bold text-lg '>Register</button>
    
    </div>
  )
}

export default Register
