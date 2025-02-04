import { useState , useEffect, createContext } from "react";
import axios from "axios";


export const MovieContext = createContext(null)

export default function MovieState({children}){

  const [genres , setGenres]  = useState([])
  
  const [movies , setMovies]  = useState([])


  useEffect(()=>{

  const fetchGenres = async()=>{
    
    try{

        const response = await axios.get('https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/genres/all');
    
        setGenres(response.data)

      
    
       }
       
       catch(error){
        console.error(error)
       }
    
    
      

}  



const fetchMovies = async()=>{
    
    try{

        const response = await axios.get('https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/movies/all-movies');
    
        setMovies(response.data)

      
    
       }
       
       catch(error){
        console.error(error)
       }
    
    
      

}  




fetchGenres()
fetchMovies()  

   
  },[])






return <MovieContext.Provider value={{genres, movies , setMovies , setGenres}}>{children}</MovieContext.Provider>    


}
