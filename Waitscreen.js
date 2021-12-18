export default function Waitscreen(props) {
  return React.createElement(
    "div",
    { className: "wait-screen" },
    React.createElement(
      "h2",
      { className: "wait-screen__prompt" },
      "Press button to start quiz"
    ),
    React.createElement(
      "button",
      { className: "wait-screen__button", onClick: props.handleClick },
      "Start"
    )
  );
}