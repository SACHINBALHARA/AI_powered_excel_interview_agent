import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import CandidateRegistration from './components/CandidateForm'
import Introduction from './components/Introduction'
import TermsAndConditions from './components/TermsAndConditions'
import InterviewQuestions from './components/QuestionFlow'

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

function App() {
  const navigate = useNavigate();

  // Wrapper component to pass onRegistered prop
  const CandidateRegistrationWrapper = () => {
    const handleRegistered = (id: string) => {
      console.log('Candidate Registered:', id);
      navigate('/introduction');
    };

    return <CandidateRegistration onRegistered={handleRegistered} />;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<CandidateRegistrationWrapper />} />
      <Route path="/introduction" element={<Introduction />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/interview" element={<InterviewQuestions />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  )
}

export default AppWrapper
