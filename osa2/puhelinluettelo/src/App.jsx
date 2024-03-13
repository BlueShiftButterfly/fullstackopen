import { useState } from 'react'

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}

const PersonList = (props) => {
  return (
    <ul>
      {props.persons.map(person => 
        <Person key={person.name} name={person.name} number={person.number}/>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState("")
  const [showAll, setShowAll] = useState(true)  

  const personsToShow = showAll
    ? persons
    : persons.filter(
      person => person.name.toLowerCase().includes(searchInput.toLowerCase())
    )

  const addPerson = (event) => {
    event.preventDefault()
    console.log("button click", event.target)
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      console.log(`${newName} is already added to phonebook`)
    }
    const newPerson = {
      name : newName,
      number: newNumber
    }
    
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
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
      <PersonList persons={personsToShow}></PersonList>
      
    </div>
  )

}

export default App