import React, { useEffect } from 'react'
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
}

const Introduction = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Introduction mounted')
  }, [])

  return (
    <div style={containerStyle}>
      <h2>Welcome to AI Powered Excel Interviewer</h2>
      <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 20 }}>
        This interview will test your Excel skills using AI-generated questions. Please answer honestly and do your best.
      </p>
      <button onClick={() => navigate('/terms')} style={buttonStyle}>
        Agree and Continue
      </button>
    </div>
  )
}

export default Introduction
