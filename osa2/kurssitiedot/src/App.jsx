
import Course from './Course'

const CourseList = (props) => {
  const { courses } = props
  return (
    <div>
      <ul>
        {courses.map(course=>
        <li key={course.id}>
          <Course course={course}></Course>
        </li>)
        }
      </ul>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>
        Web development curriculum
      </h1>
      <CourseList courses={courses}></CourseList>
    </div>
  )
}

export default App
