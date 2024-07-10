import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {
  const [dogs, setDogs] = useState([])
  const [currentDogId, setCurrentDog] = useState(null) 

  useEffect(() => { getDogs() }, [])

  const getDogs = () => {
    // fetch the dogs from /api/dogs
    fetch('/api/dogs') 
    .then(res => {
      if (!res.ok) throw new Error('Problem GETing dogs')
      return res.json() 
    })
   }
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList 
        dogs={dogs}
        getDogs={getDogs}
        />} />
        <Route path="/form" element={<DogForm 
        dog={currentDogId && dogs.find(d => d.id == currentDogId)}
          getDogs={getDogs}
          reset={() => setCurrentDog(null)} 
        />} />
      </Routes>
    </div>
  )
}
