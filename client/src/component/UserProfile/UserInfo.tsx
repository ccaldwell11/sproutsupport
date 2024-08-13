import {
  Button,
  ChakraProvider,
  Checkbox,
  Editable,
  EditableInput,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
  VStack,

} from '@chakra-ui/react';
import { useState } from 'react';

const UserInfo = ({
  avatar,
  bio,
  latitude,
  longitude,
  userName,
  EditableControls,
  handleAvatarChange,
  handleBioChange,
  handleLatLonChange,
  handleUserNameChange,
}) => {
  const [editableUserName, setEditableUserName] = useState(userName);

  return (
    <>
      <Grid className='TopGrids' border='2px solid red'
      >
        <GridItem
        className='UserAvatar'
          bg='yellow.500'
          display='flex'
          alignItems='center'
          justifyContent='center'
          justifySelf='center'
          alignSelf='center'
          borderRadius='50%'
          w='250px'
          h='250px'
          position='relative'
          overflow='hidden'
          cursor='pointer'
          onClick={() => document.getElementById('avatarInput').click()}
        >
          <Image
            src={avatar}
            alt='Click to Edit Avatar'
            w='100%'
            h='100%'
            borderRadius='50%'
            bg='green.500'
            display='flex'
            alignItems='center'
            justifyContent='center'
          />
          <input
            type='file'
            id='avatarInput'
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
        </GridItem>
      </Grid>
      <Grid
            border='2px solid orange'

      className='MidGrids'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
        <GridItem className='UserNameChange' bg='green.500' h='100px'>
          <Editable
            defaultValue={userName}
            onChange={(nextValue) => {
              setEditableUserName(nextValue);
            }}
            onSubmit={() => {
              handleUserNameChange(editableUserName);
            }}
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                Change Display name
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {userName}
            </Heading>
            <Input
              as={EditableInput}
              border='1px solid black'
              bg='white'
              placeholder='Update your User Name'
              borderRadius='md'
              minH='40px'
              p={2}
            />
          </Editable>
        </GridItem>
        <GridItem className='UserLocationChange' bg='green.500' h='150px'>
          <Editable
            defaultValue={
              latitude && longitude
                ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                : 'Coordinates not set'
            }
            isPreviewFocusable={false}
            mt={2}
            minH='40px'
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                Coordinates
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {latitude && longitude
                ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                : 'Coordinates not set'}
            </Heading>
            <Button
              onClick={handleLatLonChange}
              colorScheme='teal'
              size='md'
              mt={4}
            >
              Update My Location
            </Button>
          </Editable>
        </GridItem>
        <GridItem className='UserBioChange' bg='green.500' h='200px'>
          <Editable
            defaultValue={bio}
            onSubmit={handleBioChange}
            mt={2}
            minH='40px'
            isPreviewFocusable={false}
          >
            <Flex alignItems='center' gap='10'>
              <EditableControls bottom='5px' left='5px' w='100px' />
              <Text fontSize='xl' fontWeight='bold' ml='90px'>
                User Bio
              </Text>
            </Flex>
            <p />
            <Heading as='h2' size='lg' textAlign='center'>
              {bio}
            </Heading>
            <Input
              as={EditableInput}
              border='1px solid black'
              bg='white'
              p={2}
              borderRadius='md'
              minH='40px'
              placeholder='Update your bio'
            />
          </Editable>
        </GridItem>
        </Grid>
        {/* Put below inside an accordion?
         */}
         <Grid
      className='BottomGrids'
      border='2px solid yellow'
        templateColumns='repeat(1, 1fr)'
        w='85%'
        gap={4}
      >
          <GridItem bg='green.500' h='150px'>
          {/* Change Placeholder */}
          Checkboxes for what you want displayed on your public profile
          <VStack align='start' pl={4}>
            <Checkbox>My Plants</Checkbox>
            <Checkbox>My Created Meetups</Checkbox>
            <Checkbox>Meetups I will attend</Checkbox>
            <Checkbox>My Forum Posts</Checkbox>
          </VStack>
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          {/* Change Placeholder */}
          Email/Password/Login Method Editing will be here
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Links to Users various Social Media accounts (Twitter, Tumblr, Etc)
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Blocking - Enter the name of the User you want to block.
        </GridItem>
        <GridItem bg='green.500' h='150px'>
          Accept messages from strangers? Display link to your Forum posts? Display your plants? Your Meetups?
        </GridItem>
      </Grid>
    </>
  );
};

export default UserInfo;
