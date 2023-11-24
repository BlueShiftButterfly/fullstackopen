
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.part} {props.excercise_count}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of excercises {props.total_count}</p>
    </div>
  )
}

const App = () => {
  // const-määrittelyt
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} excercise_count={exercises1}/>
      <Content part={part2} excercise_count={exercises2}/>
      <Content part={part3} excercise_count={exercises3}/>
      <Total total_count={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App