import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Heading,
  Grid,
  GridItem,
  Button,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar';

const UserPublicProfile = ({ user }) => {
  let location = useLocation();
  let { avatar, bio, latitude, longitude, userName } = location.state || {
    bio: 'No bio available',
  };

  return (
    <Grid
      w='1100px'
      mx='auto'
      mt={10}
      p={5}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
    >
      <Grid
        className='header-grid'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        h='100px'
        gap={4}
        mb={4}
      >
        <GridItem
          colSpan={1}
          bg='teal'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            Site Logo
          </Box>
        </GridItem>
        <GridItem
          colSpan={3}
          bg='#c1e3c9'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Heading as='h1' size='2xl'>
            USER PROFILE
          </Heading>
        </GridItem>
        <GridItem
          colSpan={1}
          bg='teal'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            w='100px'
            h='100px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <NavBar />
          </Box>
        </GridItem>
      </Grid>
      <Grid
        className='content-grid'
        templateRows='1fr'
        templateColumns='1fr'
        bg='teal'
        alignItems='center'
        justifyContent='center'
        py={4}
      >
        <VStack spacing={4} align='center'>
          <Image
            borderRadius='full'
            boxSize='150px'
            src={avatar}
            alt={`${userName}'s avatar`}
          />
          <Heading as='h2' size='xl'>
            {userName}
          </Heading>
          <Text fontSize='md' color='white' textAlign='center'>
            {bio}
          </Text>
          <HStack spacing={4}>
            {latitude && longitude && (
              <Text fontSize='sm' color='white'>
                Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
              </Text>
            )}

            {/* {location_id && (
              <Text fontSize="sm" color="white">
                Location: {location_id}
              </Text>
            )} */}
          </HStack>
          <Button colorScheme='teal' variant='solid'>
            Follow(?)
          </Button>
        </VStack>
      </Grid>
    </Grid>
  );
};

export default UserPublicProfile;
