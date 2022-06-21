import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Question from './components/Question'
import Welcome from './components/Welcome'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false)
  const [questionData, setquestionData] = useState([])
  const [questions, setQuestions] = useState([])
  const [rightAnswerCount, setRightAnswerCount] = useState(0)

  useEffect(() => {
    // Fetch data only if game has started
    if (hasStarted) {
      fetch(
        'https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple'
      )
        .then((res) => res.json())
        .then((data) => setquestionData(data.results))
    }
  }, [hasStarted])

  useEffect(() => {
    setQuestions(questionData.map((item) => generateQuestionObject(item)))
  }, [questionData])

  function generateQuestionObject(dataItem) {
    return {
      id: nanoid(),
      question: dataItem.question,
      correctAnswer: dataItem.correct_answer,
      answers: generateAnswers(dataItem),
    }
  }

  function generateAnswers(dataItem) {
    let answersArray = dataItem.incorrect_answers

    // Insert correct answer randomly
    const randomIndex = Math.floor(Math.random() * 3)
    answersArray.splice(randomIndex, 0, dataItem.correct_answer)

    return answersArray.map((answer) => ({
      id: nanoid(),
      text: answer,
      isSelected: false,
    }))
  }

  function selectAnswer(questionId, answerId) {
    setQuestions((oldQuestions) =>
      oldQuestions.map((question) =>
        question.id !== questionId
          ? question
          : {
              ...question,
              answers: question.answers.map((answer) =>
                answer.id !== answerId
                  ? { ...answer, isSelected: false }
                  : { ...answer, isSelected: true }
              ),
            }
      )
    )
  }

  function checkAnswers() {
    let correctAnswerCount = 0
    questions.forEach((question) => {
      const selectedAnswer = question.answers.find(
        (answer) => answer.isSelected
      )
      if (selectedAnswer) {
        if (selectedAnswer.text === question.correctAnswer) {
          correctAnswerCount++
        }
      }
    })
    setRightAnswerCount(correctAnswerCount)
    setHasCheckedAnswers(true)
  }

  function playAgain() {
    setRightAnswerCount(0)
    setHasCheckedAnswers(false)
    setHasStarted(false)
  }

  function startQuiz() {
    setHasStarted(true)
  }

  const questionElements = questions.map((item) => (
    <Question
      key={item.id}
      data={item}
      hasCheckedAnswers={hasCheckedAnswers}
      selectAnswer={(e) => selectAnswer(item.id, e.target.id)}
    />
  ))

  function displayQuestions() {
    return (
      <>
        <div className="questions">
          {questionElements}
          <div className="checkQuestions--lbl">
            {hasCheckedAnswers ? (
              <>
                <p>
                  You scored {rightAnswerCount + '/' + questions.length} correct
                  answers
                </p>
                <button className="btn check--btn" onClick={playAgain}>
                  Play again
                </button>
              </>
            ) : (
              <button className="btn check--btn" onClick={checkAnswers}>
                Check answers
              </button>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="App">
      {!hasStarted ? <Welcome startQuiz={startQuiz} /> : displayQuestions()}
    </div>
  )
}

export default App
