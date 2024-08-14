import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  useEditableControls,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import UserTabs from './UserTabs';
import UserInfo from './UserInfo';
import UserPrivacy from './UserPrivacy';

// User context
interface User {
  id: number;
  google_id: string;
  userName: string;
  email: string;
  avatar: string;
  bio: string;
  latitude: float;
  longitude: float;
}

// Main component
const UserPrivateProfile = ({ user, setUser, onLogout, BUCKET_NAME }) => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('info');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyForecastData, setDailyForecastData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [latitude, setLatitude] = useState(64.7552);
  const [longitude, setLongitude] = useState(147.3534);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const EditableControls = () => {
    const {
      isEditing,
      getCancelButtonProps,
      getSubmitButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size='sm' position='absolute'>
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex position='absolute'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  };

  const fetchWeatherData = () => {
    setLoading(true);
    setError(null);

    // if (user.latitude && user.longitude) {
    axios
      .get('/user/weatherData')
      .then((response) => {
        const { currentWeather, dailyForecast, weatherAlerts } = response.data;
        setWeatherData(currentWeather);
        setDailyForecastData(dailyForecast);
        setAlertsData(weatherAlerts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data');
        setLoading(false);
      });
    // }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      axios
        .get('/upload/url', { params: { filename: file.name } })
        .then(({ data }) => {
          return axios.put(data, file, {
            headers: { 'Content-Type': file.type },
          });
        })
        .then(() => {
          const newAvatarUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
          return axios
            .patch('/user/updateAvatar', {
              avatar: newAvatarUrl,
            })
            .then((response) => {
              return setUser(response.data);
            });
        })
        .catch((err) => {
          console.error('Failed to get image url', err);
        });
    }
  };

  const handleUserNameChange = (newUserName: string) => {
    axios
      .patch('/user/updateUserName', { userName: newUserName })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => {
        console.error('Update User Name: Failed ', error);
      });
  };

  const handleLatLonChange = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLatitude(latitude);
          setLongitude(longitude);

          axios
            .patch('/user/updateLatLon', { latitude, longitude })
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => {
              console.error('Update GeoLocation: Failed ', error);
            });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleBioChange = (newBio: string) => {
    axios
      .patch('/user/updateBio', { bio: newBio })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => {
        console.error('Update Bio: Failed ', error);
      });
  };

  const handleLogOut = () => {
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          onLogout();
          navigate('/login');
        } else {
          console.error('Logout: Failed');
        }
      })
      .catch((err) => {
        console.error('Logout: Failed', err);
      });
  };

  const goToPublicProfile = () => {
    navigate('/public-profile', {
      state: {
        avatar: user.avatar,
        bio: user.bio,
        latitude: user.latitude,
        longitude: user.longitude,
        userName: user.userName,
        weatherData,
        dailyForecastData,
        alertsData,
      },
    });
  };

  useEffect(() => {
    // console.log('Use Effect User Check: ', user);
    if (user.latitude && user.longitude) {
      // fetchWeatherData();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Grid className='bodyGrid' w='1100px' mx='auto'>
      <Grid
        // border='5px solid yellow'
        className='header-grid'
        mt={10}
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        h='100px'
        gap={4}
        mb={4}
      >
        <GridItem
          colSpan={1}
          bg='#5AB78D'
          borderRadius='lg'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            color='white'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Logo
          </Box>
        </GridItem>
        <GridItem
          colSpan={3}
          bg='#D3FFEB'
          boxShadow='md'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading as='h1' size='2xl'>
            USER SETTINGS
          </Heading>
        </GridItem>
        <GridItem
          colSpan={1}
          bg='#5AB78D'
          borderRadius='lg'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            color='white'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <NavBar />
          </Box>
        </GridItem>
      </Grid>
      <Grid
        border='5px solid yellow'
        className='bodyGrid'
        // border='15px solid #D3FFEB'
        borderBottom='0'
        bg='#D3FFEB'
        w='1100px'
        mx='auto'
        mb='0'
        pb='0'
        borderRadius='lg'
        overflow='hidden'
        boxShadow='md'
        templateRows='1fr'
        templateColumns='1fr'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        py={4}
      >
        <UserTabs
          handleLogOut={handleLogOut}
          setCurrentView={setCurrentView}
          goToPublicProfile={goToPublicProfile}
        />
      </Grid>
      <Grid
        w='1100px'
        mx='auto'
        mt='0'
        borderRadius='lg'
        border='15px solid #D3FFEB'
        borderTop='0'
        bg='#5AB78D'
        gap={10}
        overflow='hidden'
        boxShadow='md'
        templateRows='1fr'
        templateColumns='1fr'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        py={4}
      >
        {currentView === 'info' && (
          <UserInfo
            avatar={user.avatar}
            bio={user.bio}
            latitude={user.latitude}
            longitude={user.longitude}
            userName={user.userName}
            EditableControls={EditableControls}
            handleAvatarChange={handleAvatarChange}
            handleBioChange={handleBioChange}
            handleLatLonChange={handleLatLonChange}
            handleUserNameChange={handleUserNameChange}
          />
        )}
        {currentView === 'help' && <UserPrivacy />}
      </Grid>
    </Grid>
  );
};

export default UserPrivateProfile;
