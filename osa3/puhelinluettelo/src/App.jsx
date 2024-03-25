import { useState, useEffect } from 'react'
import axios from 'axios'
import personservice from './personservice'
import "./index.css"

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  let msgType = "notification"
  if (props.isErrorNotification === true){
    msgType = "error"
  }
  console.log(props.isErrorNotification)
  console.log(props.message)

  return (
    <div className={msgType}>
      {props.message}
    </div>
  )
}

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
  const [notificationText, setNotificationText] = useState(null)
  const [isNotificationError, setisNotificationError] = useState(false)

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
            //alert(`${newPerson.name} does not exist!`)
            setisNotificationError(true)
            setNotificationText(
              `${newPerson.name}'s information does not exist! It may have already been deleted from the server`
            )
            setTimeout(() => {
              setNotificationText(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
            console.log(`${newPerson.name}'s information does not exist! It may have already been deleted from the server`)
            return
          })
          setNotificationText(
            `Changed ${newName}'s number to ${newNumber}`
          )
          setisNotificationError(false)
          setTimeout(() => {
            setNotificationText(null)
          }, 5000)
          console.log(`Updated ${newName}`)
          
        return
      }
      console.log(`Did not add ${newName} to phonebook`)
      return
    }
    personservice.createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationText(
          `Added ${newName}`
        )
        setisNotificationError(false)
        setTimeout(() => {
          setNotificationText(null)
        }, 5000)
      })
    setNewName("")
    setNewNumber("")
  }
  
  const deletePerson = (id) => {
    console.log("button click", id)
    const deletedPersonName = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${deletedPersonName}?`)){
      personservice.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          //console.log("Current list of persons: ", persons)
          //console.log("Deleted person: ", deletedPerson)
          setNotificationText(
            `Removed ${deletedPersonName}`
          )
          setisNotificationError(false)
          setTimeout(() => {
            setNotificationText(null)
          }, 5000)
        })
        .catch(error => {
          //alert(`${deletedPersonName} does not exist!`)
          setisNotificationError(true)
          setNotificationText(
            `${deletedPersonName}'s information does not exist! It may have already been deleted from the server`
          )
          setTimeout(() => {
            setNotificationText(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
          console.log(`${deletedPersonName}'s information does not exist! It may have already been deleted from the server`)
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
      <Notification message={notificationText} isErrorNotification={isNotificationError}></Notification>
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