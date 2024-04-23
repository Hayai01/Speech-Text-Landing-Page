import './App.css'
import { useState } from 'react'
import useSpeechToText from './hooks/useSpeechToText'

function App () {
  const [textInput, setTextInput] = useState('')
  const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true })

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening()
  }

  const stopVoiceInput = () => {
    setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''))
    stopListening()
  }

  return (
    <div>
      <div>
        <button
          onClick={() => { startStopListening() }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >{isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      <textarea
        onChange={(e) => { setTextInput(e.target.value) }}
        disabled={isListening} value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : ' ') : textInput} id='main-text' cols='100' rows='20' className='resize-none border border-gray-300 rounded-md px-3 py-2 text-gray-700 leading-tight focus:ring-blue bg-white m-3'
      />
    </div>
  )
}

export default App
