import Question from './Question.js'

export default function Quizscreen() {
  const [quizData, setQuizData] = React.useState([])
  const [isComplete, setIsComplete] = React.useState(false)
  const questionElements = quizData.map(obj => <Question
    question={obj.question}
    answers={obj.answers}
    correctAnswer={obj.correctAnswer}
    selectedAnswer={obj.selectedAnswer}
    selectAnswer={selectAnswer}
    isComplete={isComplete}
    key={obj.question} />)

  React.useEffect(() => {
    resetQuestions()
  }, [])

  function selectAnswer(question, answer) {
    // console.log(`Answer to question ${question} set to ${answer}`)
    setQuizData(prevQuizData => prevQuizData.map(obj => obj.question === question ? { ...obj, selectedAnswer: answer } : obj))
  }

  function resetQuestions() {
    fetch("https://opentdb.com/api.php?amount=5").then(res => res.json()).then(data => {
      setQuizData(data.results.map(obj => {
        let randomIndex = Math.floor(Math.random() * (obj.incorrect_answers.length + 1))
        return {
          question: obj.question,
          correctAnswer: obj.correct_answer,
          selectedAnswer: null,
          answers: obj.incorrect_answers.slice(0, randomIndex).concat(obj.correct_answer).concat(obj.incorrect_answers.slice(randomIndex))
        }
      }))
    })
  }

  function numberOfCorrectAnswers() {
    return quizData.filter(obj => obj.selectedAnswer === obj.correctAnswer).length
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'auto' // for smoothly scrolling
    });
  }

  function handleClick() {
    if (isComplete) {
      resetQuestions()
      setIsComplete(false)
    } else {
      setIsComplete(true)
    }
    scrollToTop()
  }

  return (
    <div className="quiz-container">
      {isComplete && <h2 className="results">{numberOfCorrectAnswers()}/{quizData.length} correct answers</h2>}
      {questionElements}
      <button className="submit-button" onClick={handleClick}>{isComplete ? "Play again" : "Submit"}</button>
    </div>
  )
}