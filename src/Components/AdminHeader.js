import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRightFromBracket, faBars  } from '@fortawesome/free-solid-svg-icons';




const AdminHeader = () => {
  const dropdownRef = useRef(null);
  const [display, setDisplay] = useState(false);
  const { currentuser, logOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [menu , setMenu] = useState(false);


  // Handle Logout
  const handleLogout = () => {
    logOut();
    setDisplay(false);
    navigate('/login'); // Redirect to login page
  };

  // Toggle Dropdown Display
  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const handleMenu = ()=>{
    setMenu((prev) => !prev);
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.user-display')
      ) {
        setDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="text-white h-auto lg:h-[100%] w-full lg:w-[256px] p-[15px] static float-left lg:float-none lg:fixed bg-[#191919]">
      <h1 className="float-left font-mono text-2xl font-extrabold text-white">
        <Link to="/admin/dashboard">Movies.io</Link>
      </h1>
      
      <FontAwesomeIcon className='block lg:hidden float-right mt-[10px]' icon={faBars} onClick={handleMenu}/>

      <div className={`mt-0 lg:mt-[50px] absolute w-full bg-[#191919] right-0 top-[69px] ${menu ? "block" : "hidden"}  lg:static lg:block`}>
        <Link className="block mb-[10px] p-[10px] rounded-md hover:bg-[#000]" to="/admin/movies">
          Movies
        </Link>
        <Link className="block mb-[10px] p-[10px] rounded-md hover:bg-[#000]" to="/admin/add-movie">
          Add Movie
        </Link>
        <Link className="block mb-[10px] p-[10px] rounded-md hover:bg-[#000]" to="/admin/genres">
          Genres
        </Link>
        <Link className="block mb-[10px] p-[10px] rounded-md hover:bg-[#000] " to="/admin/add-genre">
          Add Genre
        </Link>
      </div>

      {currentuser ? (
        <>
          {/* User Info Box */}
          <div
            className="static float-right w-auto mr-[10px] lg:mr-0 lg:float-none  lg:absolute bottom-[15px] left-0 right-0 mx-auto p-[7px] rounded-md w-[94%] lg:hover:bg-[#000] cursor-pointer user-display"
            onClick={handleDisplay}
          >
            <FontAwesomeIcon icon={faUserCircle} className="float-right lg:float-left text-[30px] mt-[-5px] lg:mt-[10px]" />
            <p className="hidden lg:block float-left ml-[10px] font-bold">
              {currentuser?.username}
              <span className="block font-normal text-[14px]">{currentuser?.email}</span>
            </p>
          </div>

          {/* Logout Dropdown */}
          {display && (
            <div
              ref={dropdownRef}
              className="rounded-md border bg-[#191919] absolute bottom-[0] h-[150px] top-[63px] lg:h-auto lg:[top:initial] right-0 lg:right-[-250px] max-w-[250px] w-full p-[10px]"
            >
              {/* User Info in Dropdown */}
              <div className="float-left w-full border-b pb-[10px] mb-[10px]">
                <FontAwesomeIcon icon={faUserCircle} className="float-left text-[30px] mt-[10px]" />
                <p className="float-left ml-[10px] font-bold">
                  {currentuser?.username}
                  <span className="block font-normal text-[14px]">{currentuser?.email}</span>
                </p>
              </div>

              {/* Logout Button */}
              <div className="float-left w-full cursor-pointer" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="float-left text-[30px] mt-[10px]" />
                <p className="float-left ml-[10px] mt-[11px] font-bold">Log out</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-300 mt-5">No User Found</p>
      )}
    </div>
  );
};

export default AdminHeader;
