interface HeaderProps {
    courseName: string
}

export const Header = (props: HeaderProps) => {
    return <div>
        <h1>{props.courseName}</h1>
    </div>
};