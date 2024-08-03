import { SetStateAction, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  IconButton,
  Button,
  Box,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

// interface post {
//   userId: number;
//   image_id: number;
//   message: string;
//   image: number;
//   comments: Array<string>;
// }

const CreatePost = () => {
  const [input, setInput] = useState('');
  const [post, setPost] = useState('');

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

  const isError = input === '';

  const [image, setImage] = useState(null);

  const handleImageChange = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const addMessage = () => {
    return axios
      .post('/post/post', { message: input })
      .then(() => {
      })
      .catch((err) => {
        console.error('Failed to POST message: ', err);
      });
  };

  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel htmlFor='image'>Upload Image</FormLabel>
          <Input
            id='image'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
          />
        </FormControl>

        {image && <Image src={image} alt='Uploaded' boxSize='200px' mt={4} />}

        <Button mt={4} onClick={}>
          Submit
        </Button>
      </Box>
      <FormControl isInvalid={isError}>
        <FormLabel>Post</FormLabel>
        <Input type='post' value={input} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>
            Select the green button to create post.
          </FormHelperText>
        ) : (
          <FormErrorMessage>A post is required.</FormErrorMessage>
        )}
        <ChakraLink as={ReactRouterLink} to='/home'>
          <IconButton
            isRound={true}
            variant='solid'
            colorScheme='teal'
            aria-label='Done'
            fontSize='20px'
            icon={}
            onClick={addMessage}
          />
        </ChakraLink>
      </FormControl>
    </Box>
  );
};

export default CreatePost;
