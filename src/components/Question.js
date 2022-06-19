export default function Question(props) {
  let answerElements = props.data.answers.map((answer) => (
    <button
      className={`answer--lbl ${answer.isSelected && 'answer--selected'}`}
      onClick={props.selectAnswer}
      id={answer.id}
      key={answer.id}
      dangerouslySetInnerHTML={{ __html: answer.text }}
    />
  ))

  return (
    <div className="question">
      <div dangerouslySetInnerHTML={{ __html: props.data.question }} />
      <div className="answers">{answerElements}</div>
      <hr />
    </div>
  )
}
