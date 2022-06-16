import { useState } from 'react'
import Welcome from './components/Welcome'

function App() {
  const [hasStarted, setHasStarted] = useState(false)

  function startQuiz() {
    setHasStarted(true)
  }

  return (
    <div className="App">
      {!hasStarted ? <Welcome startQuiz={startQuiz} /> : <div></div>}
    </div>
  )
}

export default App
