import { useDispatch } from "react-redux"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import anecdoteService from "./services/anecdoteService"
import { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer"
import { useEffect } from "react"

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])

    return (
        <div>
            <Notification></Notification>
            <h2>Anecdotes</h2>
            <Filter></Filter>
            <AnecdoteList></AnecdoteList>
            <AnecdoteForm></AnecdoteForm>
        </div>
    )
}

export default App