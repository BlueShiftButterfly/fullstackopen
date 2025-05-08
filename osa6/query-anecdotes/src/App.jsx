import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useQuery } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from "./requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "./NotificationContext"


const App = () => {
    const dispatchNotification = useNotificationDispatch()
    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation({ 
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"])
            queryClient.setQueryData(
                ["anecdotes"], 
                anecdotes.map(
                    (a) => a.id !== updatedAnecdote.id ? a : updatedAnecdote
                )
            )
            dispatchNotification({ type: "SET", payload: `Anecdote ${updatedAnecdote.content} voted`})
            setTimeout(() => {
                dispatchNotification({ type: "CLEAR"})
            }, 5000)
        }
    })
    const handleVote = (anecdote) => {
        console.log("vote")
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAnecdotes,
        retry: 1
    })
    console.log(JSON.parse(JSON.stringify(result)))

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError){
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>
    
            <Notification />
            <AnecdoteForm />
    
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
