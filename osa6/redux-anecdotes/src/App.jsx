import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote, newAnecdote } from "./reducers/anecdoteReducer"
import { useState } from "react"

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteForAnecdote(id))
    }

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log(`create: ${content}`)
        dispatch(newAnecdote(content))
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div>
                <input type="text" name="anecdote"/>
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default App