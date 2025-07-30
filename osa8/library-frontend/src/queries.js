import { gql } from "@apollo/client"

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
}
`
const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
        bookCount
        born
        id
        name
    }
}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        ...AuthorDetails
    }
}
${AUTHOR_DETAILS}
`

export const EDIT_AUTHOR = gql`
mutation ($name: String! $setBornTo: Int!){
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        ...AuthorDetails
    }
}
${AUTHOR_DETAILS}
`


export const BOOKS_BY_GENRE = gql`
query AllBooks($genre: String) {
    allBooks(genre: $genre) {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const LIST_GENRES = gql`
query AllBooks {
    allBooks {
        genres
    }
}
`

export const FAVORITE_GENRE = gql`
query Query {
  me {
    favoriteGenre
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int! $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres,
    ) {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
        value
    }
}
`

export const BOOK_ADDED = gql`
subscription {
    bookAdded {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`