import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Heading, Select } from '@chakra-ui/react'
import axios from 'axios';

type Plant = {
    CommonName: string;
    ScientificName: string;
    Id: number;
}

const PlantFinder = ({ user }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState<Plant | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [taskName, setTaskName] = useState('');
  const [freq, setFreq] = useState('');
  const [tasks, setTasks] = useState([]);


  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFreq(e.currentTarget.value);
  };

  const handleSubmit = () => {
    axios.post('/plants/search', {query: input})
      .then(({data}) => {
        setResults(data)
      })
      .catch((err) => {
        console.error('No results found.', err)
      })
  }

  const handlePlantSelect = (selected: Plant) => {
    setSelected(selected);
    setNickname(selected.CommonName)
  };

  const handleNicknameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNickname(e.currentTarget.value);
  };

  const handleBio = (e: React.FormEvent<HTMLInputElement>) => {
    setBio(e.currentTarget.value);
  };

  const handleTaskName = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const handleAddTask = () => {
    setTasks([...tasks, taskName]);
    // axios.put(`/plants/task/${data.id}`, { tasks })
    // .then((result) => {
    //   console.log(result, 'resstdshtdrjdjyfc')
    // })
    setTaskName('');
  }

  const handleNicknameSubmit = () => {
    const ScientificName = selected.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
    const { CommonName, Id } = selected;
    axios.post('/plants/newPlant', {nickname, bio, ScientificName, CommonName, Id, userId: user.id })
    .then(({data}) => {
      axios.put(`/plants/task/${data.id}`, { tasks, freq })
        .then((result) => {
        })
    })
  }





//   const handleAddPlant() {
//     axios.
//   }

  useEffect(() => {
  }, [selected, tasks, taskName])

  return (
    <div>
      <Heading>Plant Finder</Heading>
      <Link to={'/myplants'}>
        <input type="button" value="My Plants"></input>
      </Link>
      <h3>{`Searched: ${input}`}</h3>
      {/* will eventually be used with cards... */}
      <Input
        type="text"
        placeholder="Plant name"
        onChange={(e) => handleInput(e)}
      ></Input>
      <Input type="button" value="Search" onClick={() => handleSubmit()}></Input><br></br>
      {selected && selected.CommonName &&
        <div>
          <h3>Choose a name for your plant (optional)</h3>
          <Input type="text" placeholder={selected.CommonName} onChange={(e) => handleNicknameChange(e)}></Input><br></br>
          <Input type="text" placeholder="Bio :P(you get it?)" onChange={(e) => handleBio(e)}></Input><br></br>
          <Select placeholder="Select frequency" onChange={(e) => handleFrequencyChange(e)}>
            <option>second</option>
            <option>minute</option>
            <option>hour</option>
          </Select>
          <Input type="text" placeholder="Task" value={taskName} onChange={(e) => handleTaskName(e)}></Input><br></br>
          {tasks.length > 0 &&
            tasks.map((task) => (
              <h4>{task}</h4>
            ))
          }
          <Input type="button" value="Add Task" onClick={() => handleAddTask()}></Input>
          <Input type="button" value="Add New Plant" onClick={() => handleNicknameSubmit()}></Input>
        </div>
      }
      {results &&
        results.map((result, i) => {
            // look into simplifying this later
            const scientificName = result.ScientificName.replace(/<[^>]*>/g, '').split(' ').slice(0, 2).join(' ');
        //   needs nicer looking display or possibly separate component
        return (

        <div key={`${result}-${i}`}>
          <h3 onClick={() => handlePlantSelect(result)}>{result.CommonName}</h3>
          <h5>{scientificName}</h5>
          {/* look for API image data */}
          {/* <img src={result.ProfileImageFilename}></img> */}
        </div>
        )
})
      }
    </div>
  );
};

export default PlantFinder;
