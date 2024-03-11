import { useState } from 'react'

const GetRandomRange = (min, max) => {
  return (Math.round(Math.random() * (max - min) + min))
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.func}>{props.name}</button>
    </div>
  )
}

const VoteCount = (props) => {
  return (
    <p>
      Has {props.count} votes
    </p>
  )
}

const GetHighestVotedByIndex = (voteArray) => {
  if (voteArray.length <= 0){
    return null
  }
  let highestVoteCount = voteArray[0]
  let highestVoteIndex = 0
  for(let i = 0; i<voteArray.length; i++){
    if (voteArray[i] > highestVoteCount){
      highestVoteCount = voteArray[i]
      highestVoteIndex = i
    }
  }
  return highestVoteIndex
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const SetRandomAnecdote = () => {
    let num = GetRandomRange(0, anecdotes.length-1)
    setSelected(num)
  }

  const HandleVoteClick = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}
      <VoteCount count={votes[selected]}></VoteCount>
      <Button name={"Next"} func={SetRandomAnecdote}></Button>
      <Button name={"Vote"} func={HandleVoteClick}></Button>
      <h1>
        Anecdote With the most votes
      </h1>
      {anecdotes[GetHighestVotedByIndex(votes)]}
      <VoteCount count={votes[GetHighestVotedByIndex(votes)]}></VoteCount>
    </div>
  )
}

export default App