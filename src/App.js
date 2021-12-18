import Quizscreen from './Quizscreen.js'
import Waitscreen from './Waitscreen.js'

export default function App() {
  const [isStarted, setIsStarted] = React.useState(false)

  function handleClick() {
    setIsStarted(true)
  }
  return (
    <div className="app">
      {isStarted ? <Quizscreen /> : <Waitscreen handleClick={handleClick} />}
    </div>
  )
}