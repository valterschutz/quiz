export default function Question(props) {
  const buttonElements = props.answers.map(ans => <button
    key={ans}
    className={`ans-button ${ans === props.selectedAnswer ? "ans-button--selected" : ""} ${props.isComplete && ans === props.correctAnswer ? "ans-button--correct" : ""}`}
    onClick={() => props.selectAnswer(props.question, ans)}
    dangerouslySetInnerHTML={{ __html: ans }}
  />)

  return (
    <div className="quiz">
      <h2 className="question"
        dangerouslySetInnerHTML={{ __html: props.question }} />
      <div className="button-container">
        {buttonElements}
      </div>
    </div>
  )
}
