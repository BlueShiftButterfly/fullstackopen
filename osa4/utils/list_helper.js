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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}