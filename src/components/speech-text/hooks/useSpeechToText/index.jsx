import React, { useEffect, useRef, useState } from 'react'

const useSpeechToText = (options) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Web speech api is not supported')
      return
    }
    recognitionRef.current = new window.webkitSpeechRecognition()
    const recognition = recognitionRef.current
    recognition.interimResults = options.interimResults || true
    recognition.lang = options.lang || 'en-US'
    recognition.continuous = options.continuous || false

    recognition.onresult = (event) => {
      let text = ''
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript
      }
      setTranscript(text)
    }

    recognition.onerror = (event) => {
      console.error('Speech Error')
    }

    recognition.onend = (event) => {
      setIsListening(false)
    }

    return () => {
      recognition.stop()
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  return {
    isListening,
    transcript,
    startListening,
    stopListening
  }
}

export default useSpeechToText
