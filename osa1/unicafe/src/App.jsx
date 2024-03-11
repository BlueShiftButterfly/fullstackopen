import { useState } from 'react'

const Statistics = (props) => {
  if (props.parts[3].review_count <= 0){
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine name={props.parts[0].name} value={props.parts[0].review_count}></StatisticsLine>
        <StatisticsLine name={props.parts[1].name} value={props.parts[1].review_count}></StatisticsLine>
        <StatisticsLine name={props.parts[2].name} value={props.parts[2].review_count}></StatisticsLine>
        <StatisticsLine name={props.parts[3].name} value={props.parts[3].review_count}></StatisticsLine>
        <StatisticsLine name={props.parts[4].name} value={props.parts[4].review_count}></StatisticsLine>
        <StatisticsLine name={props.parts[5].name} value={props.parts[5].positive_percentage}></StatisticsLine>
      </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const ReviewButton = (props) => {
  return (
    <button onClick={props.function}>{props.name}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const review_content = [
    {
      name: "Good",
      review_count: good
    },
    {
      name: "Neutral",
      review_count: neutral
    },
    {
      name: "Bad",
      review_count: bad
    },
    {
      name: "All",
      review_count: good+neutral+bad
    },
    {
      name: "Average",
      review_count: (good+neutral+bad)/3
    },
    {
      name: "",
      positive_percentage: (good/(good+neutral+bad))*100
    }
  ]

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutrallick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>
          Give Feedback
        </h1>
      </div>
      <div>
        <ReviewButton name={"Good"} function={handleGoodClick}></ReviewButton>
        <ReviewButton name={"Neutral"} function={handleNeutrallick}></ReviewButton>
        <ReviewButton name={"Bad"} function={handleBadClick}></ReviewButton>
      </div>
      <div>
        <h1>
          Statistics
        </h1>
        <Statistics parts={review_content}></Statistics>
      </div>
    </div>
  )
}

export default App