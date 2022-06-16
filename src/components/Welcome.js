export default function Welcome(props) {
  return (
    <div className="welcome">
      <h1>Quizzical</h1>
      <p>Do you dare to test your knowledge?</p>
      <button className="btn welcome--btn" onClick={props.startQuiz}>
        Start quiz
      </button>
    </div>
  )
}
