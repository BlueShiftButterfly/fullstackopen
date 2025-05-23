import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => { 
    const dispatchNotification = useNotificationDispatch()
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({ 
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"])
            queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
            dispatchNotification({ type: "SET", payload: `Anecdote ${newAnecdote.content} created`})
            setTimeout(() => {
                dispatchNotification({ type: "CLEAR"})
            }, 5000)
        },
        onError: (error) => {
            dispatchNotification({ type: "SET", payload: error.response.data.error})
            setTimeout(() => {
                dispatchNotification({ type: "CLEAR"})
            }, 5000)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log("new anecdote")
        newAnecdoteMutation.mutate({ content: content, votes: 0 })
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
