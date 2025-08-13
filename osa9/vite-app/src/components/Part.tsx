import type { CoursePart } from "../types"

interface PartProps {
    coursePart: CoursePart
}

export const Part = (props: PartProps) => {
    switch (props.coursePart.kind) {
        case "basic":
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p>{props.coursePart.description}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p>{props.coursePart.description}</p>
                    <p>Background Material: {props.coursePart.backgroundMaterial}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p>Group Project Count: {props.coursePart.groupProjectCount}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
                    <p>{props.coursePart.description}</p>
                    <p>Requirements: {props.coursePart.requirements.join(", ")}</p>
                </div>
            )
        default:
            return (
                <div>

                </div>
            )
    }
}