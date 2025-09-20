import React, { useState, useEffect } from 'react'

const containerStyle: React.CSSProperties = {
  maxWidth: 600,
  margin: '40px auto',
  padding: 30,
  border: '1.5px solid #ccc',
  borderRadius: 12,
  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: '#f9f9f9',
  color: '#333',
}

const titleStyle: React.CSSProperties = {
  marginBottom: 25,
  fontSize: '1.6rem',
  fontWeight: 600,
  borderBottom: '2px solid #2E86C1',
  paddingBottom: 8,
  color: '#2E86C1',
}

const textareaStyle: React.CSSProperties = {
  width: '100%',
  minHeight: 140,
  padding: 16,
  borderRadius: 10,
  border: '1.5px solid #888',
  resize: 'vertical',
  fontSize: '1.1rem',
  marginBottom: 18,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  transition: 'border-color 0.3s ease',
}

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: 12,
}

const buttonStyleBase: React.CSSProperties = {
  flex: '1 1 auto',
  padding: '14px 24px',
  borderRadius: 10,
  border: 'none',
  fontWeight: 700,
  fontSize: '1.1rem',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(46,134,193,0.3)',
  userSelect: 'none',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
}

const submitButtonStyle: React.CSSProperties = {
  ...buttonStyleBase,
  backgroundColor: '#2E86C1',
  color: 'white',
}

const submitButtonDisabledStyle: React.CSSProperties = {
  ...submitButtonStyle,
  backgroundColor: '#a4c2f4',
  cursor: 'not-allowed',
  boxShadow: 'none',
}

const skipButtonStyle: React.CSSProperties = {
  ...buttonStyleBase,
  backgroundColor: '#D5DBDB',
  color: '#556771',
  boxShadow: '0 4px 8px rgba(213,219,219,0.7)',
}

interface QuestionFlowProps {
  questionText?: string
  onSubmit?: (answer: string) => void
  onSkip?: () => void
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({
  questionText = 'What is your experience with Excel formulas?',
  onSubmit = answer => alert(`Submitted: ${answer}`),
  onSkip = () => alert('Skipped question'),
}) => {
  useEffect(() => {
    console.log('QuestionFlow mounted')
  }, [])

  const [answer, setAnswer] = useState('')

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{questionText}</h3>
      <textarea
        placeholder="Type your answer here or skip to move forward..."
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        style={textareaStyle}
      />

      <div style={buttonGroupStyle}>
        <button
          disabled={!answer.trim()}
          onClick={() => {
            onSubmit(answer.trim())
            setAnswer('')
          }}
          style={answer.trim() ? submitButtonStyle : submitButtonDisabledStyle}
          aria-disabled={!answer.trim()}
          aria-label="Submit Answer"
        >
          Submit
        </button>

        <button
          onClick={() => {
            onSkip()
            setAnswer('')
          }}
          style={skipButtonStyle}
          aria-label="Skip Question"
        >
          Skip
        </button>
      </div>
    </div>
  )
}

export default QuestionFlow
