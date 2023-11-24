
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
  return (
    <div>
      <Part name={props.p1} ex_count={props.ex1}/>
      <Part name={props.p2} ex_count={props.ex2}/>
      <Part name={props.p3} ex_count={props.ex3}/>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1.name} ex1={part1.exercises} p2={part2.name} ex2={part2.exercises} p3={part3.name} ex3={part3.exercises} />
      <Total total_count={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App