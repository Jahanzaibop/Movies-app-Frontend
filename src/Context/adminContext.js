import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext(null);

export default function AdminState({ children }) {
  const [reviews, setReviews] = useState([]);
  const [movieId, setMovieId] = useState(null); // Store the movieId in context

  const updateMovieId = (id) => {
    setMovieId(id);
  };

  
  useEffect(() => {

    
    if (movieId) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`https://joint-valery-jahanzaib-7a131339.koyeb.app/api/v1/movies/${movieId}/reviews`);
          
          setReviews(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchReviews();
    }
  }, [movieId]); // Fetch reviews when movieId changes

  

  return (
    <AdminContext.Provider value={{ reviews, setReviews, updateMovieId }}>
      {children}
    </AdminContext.Provider>
  );
}
