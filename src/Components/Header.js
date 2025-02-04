import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { MovieContext } from '../Context/movieContext';

const Header = () => {
  const { currentuser, logOut } = useContext(UserContext);
  const { movies } = useContext(MovieContext);

  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [display, setDisplay] = useState(false);

  const dropdownRef = useRef(null);
  const searchDropdownRef = useRef(null); // Ref for search dropdown

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query.trim() === '') {
      setFilteredMovies([]);
    } else {
      const filtered = movies.filter((movie) => movie.name.toLowerCase().includes(query));
      setFilteredMovies(filtered);
    }
  };

  const handleLogout = () => {
    logOut();
    setDisplay(false);
  };

  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const handleSelectMovie = (movieId) => {
    setSearch('');
    setFilteredMovies([]);
    navigate(`/movies/${movieId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user dropdown if clicking outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.user-display')
      ) {
        setDisplay(false);
      }

      // Close search dropdown if clicking outside
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target) &&
        event.target.type !== 'text' // Ensure it doesn't close when clicking inside the search input
      ) {
        setFilteredMovies([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 bg-black p-[15px] z-[999]">
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-3">
          <h1 className="float-left lg:float-none font-mono text-2xl font-extrabold text-white">
            <Link to="/">Movies.io</Link>
          </h1>
          
         
          <input
            onChange={handleSearch}
            value={search}
            className="hidden lg:block rounded-md p-[5px] bg-transparent border text-white placeholder:text-white"
            type="text"
            placeholder="Search Movies"
          />

          {/* Search Dropdown */}
          {filteredMovies.length > 0 && (
            <ul
              ref={searchDropdownRef}
              className="absolute top-[55px] left-0 right-0 m-auto max-w-[426px] w-full bg-[#191919] text-white rounded-md shadow-lg max-h-[200px] overflow-y-auto"
            >
              {filteredMovies.map((movie) => (
                <li
                  key={movie._id}
                  onClick={() => handleSelectMovie(movie._id)}
                  className="p-[10px] cursor-pointer grid grid-cols-10 items-center gap-2 border-b last:border-b-0"
                >
                  <div className="col-span-2">
                    <img src={movie.image} alt="" className="w-full h-auto rounded-md" />
                  </div>
                  <div className="col-span-5 font-medium">
                    <p>{movie.name}</p>
                    <p className="mt-[10px]">{movie.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* User Dropdown */}
          <div className={currentuser ? 'flex items-end justify-end relative font-mono' : ''}>
            {currentuser ? (
              <>
                <span
                  onClick={handleDisplay}
                  className="cursor-pointer user-display text-white capitalize font-bold text-[20px]"
                >
                  <FontAwesomeIcon icon={faUserCircle} /> <span className='hidden lg:inline'>{currentuser?.username}{' '}</span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>

                <div
                  ref={dropdownRef}
                  className={`${currentuser.isAdmin ? 'bottom-[-153px]' : 'bottom-[-113px]'} 
                  bg-white absolute max-w-[150px] w-full p-[10px] rounded-md ${
                    display ? 'block' : 'hidden'
                  }`}
                >
                  {currentuser.isAdmin ? (
                    <span className="cursor-pointer font-bold border-b border-black block pb-[10px] mb-[10px]">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </span>
                  ) : (
                    ''
                  )}
                  <span className="cursor-pointer font-bold border-b border-black block pb-[10px] mb-[10px]">
                    <Link to={`/profile/${currentuser._id}`}>Profile</Link>
                  </span>
                  <span className="cursor-pointer font-bold block pb-[10px]" onClick={handleLogout}>
                    Logout
                  </span>
                </div>
              </>
            ) : (
              <ul className="flex items-end justify-end">
                <li className="p-[5px] bg-white rounded-md font-extrabold max-w-[150px] w-full text-center mr-[10px]">
                  <Link to="/register">Register</Link>
                </li>
                <li className="p-[5px] bg-white rounded-md font-extrabold max-w-[150px] w-full text-center">
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
