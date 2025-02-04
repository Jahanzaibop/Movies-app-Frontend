import { useState , useEffect, createContext } from "react";
import axios from 'axios';

export const UserContext = createContext(null);

export default function  UserState ({children}) {
  
    const [currentuser , setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentuser')) || null)

    const login = async (user) =>{

        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/users/auth',
                user,
                {
                    withCredentials: true // Ensure cookies are sent and received
                }
            );
            setCurrentUser(response.data); // Set current user in context or state
            return response.data
        }
        catch(error){
            console.error(error);
        }
        
    }

    const logOut = async () =>{

        try{
            await axios.post('https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/users/logout')
            setCurrentUser(null);
        }

        catch(error){
            console.error(error);
        }

        
    }

    useEffect(()=>{
    localStorage.setItem("currentuser" , JSON.stringify(currentuser))
    
    
    },[currentuser])


    return <UserContext.Provider value={{currentuser , setCurrentUser, login , logOut}}>{children}</UserContext.Provider>


} 