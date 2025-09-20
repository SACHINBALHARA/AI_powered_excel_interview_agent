import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const containerStyle: React.CSSProperties = {
  maxWidth: 600,
  margin: '50px auto',
  padding: 30,
  backgroundColor: '#fefefe',
  boxShadow: '0 8px 22px rgba(0,0,0,0.07)',
  borderRadius: 14,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
}

const checkboxContainer = {
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: 18,
  userSelect: 'none',
}

const buttonStyle: React.CSSProperties = {
  marginTop: 25,
  padding: '14px 30px',
  backgroundColor: '#2E86C1',
  color: 'white',
  border: 'none',
  borderRadius: 10,
  fontWeight: '700',
  fontSize: '1.1rem',
  cursor: 'pointer',
  boxShadow: '0 5px 16px rgba(46,134,193,0.3)',
  disabled: {
    backgroundColor: '#d0d7de',
    cursor: 'not-allowed',
  } as React.CSSProperties,
}

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('TermsAndConditions mounted')
  }, [])

  const handleContinue = () => {
    if (accepted) {
      navigate('/interview')
    }
  }

  return (
    <div style={containerStyle}>
      <h2>Terms and Conditions</h2>
      <p style={{ marginTop: 20, fontSize: 16, lineHeight: 1.5 }}>
        Please read and accept the terms and conditions to proceed with the interview.
      </p>
      <div style={checkboxContainer}>
        <input id="accept" type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} />
        <label htmlFor="accept">I accept the terms and conditions</label>
      </div>
      <button
        onClick={handleContinue}
        style={accepted ? buttonStyle : { ...buttonStyle, backgroundColor: '#d0d7de', cursor: 'not-allowed' }}
        disabled={!accepted}
      >
        Continue
      </button>
    </div>
  )
}

export default TermsAndConditions
