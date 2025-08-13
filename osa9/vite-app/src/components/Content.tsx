import type { CoursePart } from "../types"
import { Part } from "./Part"

interface ContentProps {
    courseParts: CoursePart[]
}


export const Content = (props: ContentProps) => {
    return <div>
        {
            props.courseParts.map(c => <Part key={c.name} coursePart={c}></Part>)
        }
    </div>
}