import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import CreatePost from "./CreatePost";
import OwnedPlants from "./PlantCare/OwnedPlants";
import PlantFinder from "./PlantCare/PlantFinder";
import { ChakraProvider } from '@chakra-ui/react';
import Login from './Login';
import UserPrivateProfile from './UserProfile/UserPrivateProfile';
import UserPublicProfile from './UserProfile/UserPublicProfile';
import Meetup from "./meetup/Meetup";
import Post from './Post';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Users authentication status
    fetch('/api/checkAuth')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Login Status Fetch: Failed', err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <div className='App'>
        Sprout Support
        {/* {isAuthenticated && <UserPrivateProfile onLogout={handleLogout} />} */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/home'
            element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
          />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/post' element={<Post />} />
          <Route path='/myplants' element={<OwnedPlants />}></Route>
          <Route path='/plantfinder' element={<PlantFinder />}></Route>
          <Route path='/userprofile' element={<UserPrivateProfile onLogout={handleLogout} />}></Route>
          <Route path='/public-profile' element={<UserPublicProfile />}></Route>
          <Route
            path='/'
            element={<Navigate to={isAuthenticated ? '/home' : '/login'} />}
          />
          <Route path='/meetup' element={<Meetup />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
