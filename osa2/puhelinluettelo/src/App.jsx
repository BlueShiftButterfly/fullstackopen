import { useState, useEffect } from 'react'
import axios from 'axios'
import personservice from './personservice'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number} <button onClick={props.personDeleterFunc}>Delete</button>
    </div>
  )
}

const PersonList = (props) => {
  return (
    <ul>
      {props.persons.map(person => 
        <Person key={person.id} name={person.name} number={person.number} personDeleterFunc={() => props.personDeleterFunc(person.id)}/>
      )}
    </ul>
  )
}

const Filter = (props) => {
  return ( 
    <div>
      Filter shown with
      <input onChange={props.filterHandler}></input>
    </div>
)
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.personAdderFunc}>
      <div>
        Name: 
        <input onChange={props.nameHandler}>
        </input>
      </div>
      <div>
        Number: 
        <input onChange={props.numberHandler}>
        </input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState("")
  const [showAll, setShowAll] = useState(true)  

  useEffect(() => {
    console.log('effect')
    personservice.getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])
  console.log('render', persons.length, 'persons')

  const personsToShow = showAll
    ? persons
    : persons.filter(
      person => person.name.toLowerCase().includes(searchInput.toLowerCase())
    )

  const addPerson = (event) => {
    event.preventDefault()
    console.log("button click", event.target)
    const newPerson = {
      name : newName,
      number: newNumber
    }
    if (persons.find(p => p.name === newName)) {
      console.log(`${newName} is already added to phonebook`)
      const id = persons.find(p => p.name === newName).id
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personservice
          .updatePerson(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          .catch(error => {
            alert(`${newPerson.name} does not exist!`)
            setPersons(persons.filter(p => p.id !== id))
            return
          })
          console.log(`Updated ${newName}`)
        return
      }
      console.log(`Did not add ${newName} to phonebook`)
      return
    }
    personservice.createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    setNewName("")
    setNewNumber("")
  }
  
  const deletePerson = (id) => {
    console.log("button click", id)
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)){
      personservice.deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
        .catch(error => {
          alert(`${persons.find(p => p.id === id).name} does not exist!`)
          setPersons(persons.filter(p => p.id !== id))
          return
        })
      console.log(persons)
    }
  }

  const handleNameInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearchInputChange = (event) => {
    console.log(event.target.value)
    setSearchInput(event.target.value)
    setShowAll(searchInput == "")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={handleSearchInputChange}></Filter>
      <h2>Add a new contact</h2>
      <PersonForm nameHandler={handleNameInputChange} numberHandler={handleNumberInputChange} personAdderFunc={addPerson}></PersonForm>
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} personDeleterFunc={deletePerson}></PersonList>
      
    </div>
  )

}

export default App