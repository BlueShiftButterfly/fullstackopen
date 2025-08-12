interface TotalProps {
    totalExcercises: number
}

export const Total = (props: TotalProps) => {
    return <div>
        <p>Number of exercises {props.totalExcercises}</p>
    </div>
}