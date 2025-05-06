import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log(`create: ${content}`)
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={newAnecdote}>
                <div>
                    <input type="text" name="anecdote"/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm