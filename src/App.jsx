import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const submitPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (persons.some((person) => person.name === newPerson.name)) {
      handleExistingName(newPerson)
    }
    else {
      personsService
        .addPerson(newPerson)
        .then(p => setPersons(persons.concat(p)))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleExistingName = (newPerson) => {
    const id = persons.find(p => p.name === newPerson.name).id
    if (confirm(`${newPerson.name} has already been added to phonebook, replace the old number with a new one?`)) {
      personsService
        .updatePerson(newPerson, id)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
    }
  }

  const deletePerson = (name, id) => {
    if (confirm(`delete ${name} ?`)) {
      personsService.removePerson(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleFilter}/>
      <h2>Add New</h2>
      <PersonForm onSubmit={submitPerson}
        nameValue={newName} handleNewName={handleNewName}
        numberValue={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={deletePerson}/>
    </div>
  )
}

export default App