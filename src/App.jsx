import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personsService from './services/persons.js'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])
  
  if (!persons) {
    return <h1>Loading...</h1>
  }

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
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          displayNotification(`${returnedPerson.name} has been added`, false)
        })
    }
  }

  const handleExistingName = (newPerson) => {
    const id = persons.find(p => p.name === newPerson.name).id
    if (confirm(`${newPerson.name} has already been added to phonebook, replace the old number with a new one?`)) {
      personsService
        .updatePerson(newPerson, id)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          displayNotification(`The number of ${returnedPerson.name} has been changed`, false)
        })
        .catch(error => {
          displayNotification(`${newPerson.name} does not exist on server`, true)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const deletePerson = (name, id) => {
    if (confirm(`delete ${name} ?`)) {
      personsService.removePerson(id)
      setPersons(persons.filter(p => p.id !== id))
      displayNotification(`${name} has been deleted`, true)
    }
  }

  const displayNotification = (message, isError) => {
    const newNotification = { message, isError }
    setNotification(newNotification)
    setTimeout(() => setNotification(null), 5000)
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
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