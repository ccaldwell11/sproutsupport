import { SetStateAction, useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';

const Comment = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setInput(e.target.value);

  const isError = input === '';

  const addComment = () => {
    return axios
      .post('post/comment', {})
      .then(() => {
      })
      .catch((err) => {
        console.error('Failed to POST comment: ', err);
      });
  }


  return (
    <Flex>
      <FormControl isInvalid={isError}>
        <FormLabel>Comment</FormLabel>
        <Input type='post' value={input} onChange={handleInputChange} />
        {!isError ? (
          <FormHelperText>
            Press Submit to create comment.
          </FormHelperText>
        ) : (
          <FormErrorMessage>A comment is required.</FormErrorMessage>
        )}
        <Button mt={4} onClick={addComment}>
          Submit
        </Button>
      </FormControl>
    </Flex>
  );
};

export default Comment;