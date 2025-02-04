import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Moviedetails from './Pages/Moviedetails';
import Dashboard from './Pages/Admin/Dashboard';
import AdminHeader from './Components/AdminHeader';
import Movies from './Pages/Admin/Movies';
import Updatemovies from './Pages/Admin/Updatemovies';
import Addmovies from './Pages/Admin/Addmovies';
import Genre from './Pages/Admin/Genre';
import Addgenre from './Pages/Admin/Addgenre';
import Footer from './Components/Footer';
function MainLayout() {
  const location = useLocation();
  
  // Only show the header if the path does not start with '/admin'
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute ?  <Header />  : <AdminHeader/> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/movies/:id" element={<Moviedetails />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/movies" element={<Movies />} />
        <Route path="/admin/update-movie/:id" element={<Updatemovies/>} />
        <Route path="/admin/add-movie" element={<Addmovies/>} />
        <Route path="/admin/genres" element={<Genre/>} />
        <Route path="/admin/add-genre" element={<Addgenre/>} />
       
      </Routes>
      {!isAdminRoute ?  <Footer/>  : '' }
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
