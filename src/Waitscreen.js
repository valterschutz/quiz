export default function Waitscreen(props) {
  return (
    <div className="wait-screen">
      <h2 className="wait-screen__prompt">Press button to start quiz</h2>
      <button className="wait-screen__button" onClick={props.handleClick}>Start</button>
    </div>
  )
}