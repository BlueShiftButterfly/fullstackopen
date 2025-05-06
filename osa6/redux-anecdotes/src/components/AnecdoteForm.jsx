import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log(`create: ${content}`)
        dispatch(newAnecdote(content))
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={createAnecdote}>
                <div>
                    <input type="text" name="anecdote"/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm