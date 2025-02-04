import React, {useState, useContext} from 'react'
import {UserContext} from '../Context/userContext'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

const {login} = useContext(UserContext);

const navigate = useNavigate();

    const [input , setInput ] = useState({
     
        email:'',
        password:''

    })

    const handleChange = (event) =>{
        setInput((prev) => ({...prev , [event.target.name] : event.target.value}))
    }


    const handleClick = async e =>{
        e.preventDefault();

        if(!input.email || !input.password) return toast.error("All Fields Are required");

       try{
        const userData = await login(input)
      
        toast.success("Logged In Sucessfully")
        if(userData.isAdmin){
          setTimeout(()=> navigate('/admin/dashboard'), 1500)
        }

        else{
          setTimeout(()=> navigate('/'), 1500)
        }
       
       
    }

       catch(error){
        console.error(error);
       }
        

    }



  return (
    <div className='mx-auto max-w-[600px] mt-[100px]'>
      <ToastContainer/>
      
      <h1 className=' mb-[20px] text-[30px] font-bold font-sans text-white text-center'>Login</h1>

      <input className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' onChange={handleChange} type='email' placeholder='email' name="email"/>
      <input className='bg-transparent border text-white placeholder:text-white w-full mb-[10px] p-[5px] rounded-md' onChange={handleChange} type='password' placeholder='password' name="password"/>
      <button className='p-[5px] w-full bg-white rounded-md font-bold text-lg' onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login
