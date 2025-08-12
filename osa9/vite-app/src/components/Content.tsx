interface ContentProps {
    courseParts: {name: string, exerciseCount: number}[]
}


export const Content = (props: ContentProps) => {
    return <div>
        {
            props.courseParts.map(c => <p key={c.name}>{c.name} {c.exerciseCount}</p>)
        }
    </div>
}