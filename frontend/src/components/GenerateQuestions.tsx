import React, { useState } from 'react';
import { generateQuestions } from '../api/api';

const GenerateQuestions: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const response = await generateQuestions({ domain, experience_years: experienceYears });
      const data = response.data;
      // Assuming the response array contains objects with 'question' field
      setQuestions(data.map((q: any) => q.question));
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={e => setDomain(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="number"
        placeholder="Years of Experience"
        value={experienceYears}
        onChange={e => setExperienceYears(Number(e.target.value))}
        style={{ marginRight: 8, width: 140 }}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Questions'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {questions.map((question, idx) => (
          <li key={idx}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateQuestions;
