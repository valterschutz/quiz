export default function Question(props) {
  var buttonElements = props.answers.map(function (ans) {
    return React.createElement("button", {
      key: ans,
      className: "ans-button " + (ans === props.selectedAnswer ? "ans-button--selected" : "") + " " + (props.isComplete && ans === props.correctAnswer ? "ans-button--correct" : ""),
      onClick: function onClick() {
        return props.selectAnswer(props.question, ans);
      },
      dangerouslySetInnerHTML: { __html: ans }
    });
  });

  return React.createElement(
    "div",
    { className: "quiz" },
    React.createElement("h2", { className: "question",
      dangerouslySetInnerHTML: { __html: props.question } }),
    React.createElement(
      "div",
      { className: "button-container" },
      buttonElements
    )
  );
}