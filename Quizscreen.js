var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Question from './Question.js';

export default function Quizscreen() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      quizData = _React$useState2[0],
      setQuizData = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isComplete = _React$useState4[0],
      setIsComplete = _React$useState4[1];

  var questionElements = quizData.map(function (obj) {
    return React.createElement(Question, {
      question: obj.question,
      answers: obj.answers,
      correctAnswer: obj.correctAnswer,
      selectedAnswer: obj.selectedAnswer,
      selectAnswer: selectAnswer,
      isComplete: isComplete,
      key: obj.question });
  });

  React.useEffect(function () {
    resetQuestions();
  }, []);

  function selectAnswer(question, answer) {
    // console.log(`Answer to question ${question} set to ${answer}`)
    setQuizData(function (prevQuizData) {
      return prevQuizData.map(function (obj) {
        return obj.question === question ? Object.assign({}, obj, { selectedAnswer: answer }) : obj;
      });
    });
  }

  function resetQuestions() {
    fetch("https://opentdb.com/api.php?amount=5").then(function (res) {
      return res.json();
    }).then(function (data) {
      setQuizData(data.results.map(function (obj) {
        var randomIndex = Math.floor(Math.random() * (obj.incorrect_answers.length + 1));
        return {
          question: obj.question,
          correctAnswer: obj.correct_answer,
          selectedAnswer: null,
          answers: obj.incorrect_answers.slice(0, randomIndex).concat(obj.correct_answer).concat(obj.incorrect_answers.slice(randomIndex))
        };
      }));
    });
  }

  function numberOfCorrectAnswers() {
    return quizData.filter(function (obj) {
      return obj.selectedAnswer === obj.correctAnswer;
    }).length;
  }

  function handleClick() {
    if (isComplete) {
      resetQuestions();
      setIsComplete(false);
    } else {
      setIsComplete(true);
    }
  }

  return React.createElement(
    "div",
    { className: "quiz-container" },
    questionElements,
    isComplete && React.createElement(
      "h2",
      { className: "results" },
      numberOfCorrectAnswers(),
      "/",
      quizData.length,
      " correct answers"
    ),
    React.createElement(
      "button",
      { className: "submit-button", onClick: handleClick },
      isComplete ? "Play again" : "Submit"
    )
  );
}