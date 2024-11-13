const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes, 0
    )
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    return blogs
        .map(
            (x) => x
        )
        .sort(
            (a, b) =>  {
                return b.likes - a.likes
            }
        )
        [0]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
    var authors = new Map()
    blogs.forEach(blog => {
        if (authors.has(blog.author) === false) {
            authors.set(blog.author, 1)
        }
        else {
            authors.set(blog.author, authors.get(blog.author) + 1)
        }
    })
    var popularAuthor = Array.from(authors.entries()).sort
    (
        (a, b) => {
            return b[1] - a[1]
        }
    )[0]    
    return { author: popularAuthor[0], blogs: popularAuthor[1] }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}