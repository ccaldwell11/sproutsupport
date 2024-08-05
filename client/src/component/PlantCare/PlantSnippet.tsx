import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';

const PlantSnippet = ({ plant }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/plants/overdue/${plant.id}`)
      .then(({data}) => {
        setTasks(data)
        // console.log(plant.nickname, data)
      })
    // console.log(plant)
  }, [])

  return (
    <Card>
    <CardHeader>
        <Heading size='md'>{plant.nickname}</Heading>
        {plant.nickname !== plant.commonName && <h3>{<strong>{plant.commonName}</strong>}</h3>}
        {/* {tasks.length === 1 && <h3>!! {tasks.length} Task Due</h3>} */}
        {tasks.length > 0 ? tasks.length === 1 ? ( <h3>!! {tasks.length} Task Due</h3> ) : ( <h3>!! {tasks.length} Tasks Due</h3> ): ( <h3>No Tasks</h3> )}
        {/* <h4>{plant.CommonName}</h4> */}
    </CardHeader>
    <CardBody>

        <h3><em>{plant.description}</em></h3>
    </CardBody>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <p style={{color:"red"}}>{task.taskName}</p>
          ))
        }
    <CardFooter>
      <DeleteIcon />
    </CardFooter>
    </Card>
  )
}

export default PlantSnippet;

