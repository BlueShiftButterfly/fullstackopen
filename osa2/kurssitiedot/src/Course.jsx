const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.ex_count}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    const { parts } = props
    return (
      <div>
        <ul>
          {parts.map(part => 
            <li key={part.id}>
              <Part name={part.name} ex_count={part.exercises}></Part>
            </li>)
          }
        </ul>
      </div>
    )
  }
  
  const Total = (props) => {
    const total_count = props.parts.reduce(
      (acc, current_part) => acc + current_part.exercises, 0
    )
    return (
      <div>
        <p>Number of excercises {total_count}</p>
      </div>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts}/>
      </div>
    )
  }

  export default Course