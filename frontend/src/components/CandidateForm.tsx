import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

const inputStyle: React.CSSProperties = {
  padding: '10px',
  margin: '8px 0',
  borderRadius: '6px',
  border: '1.5px solid #ccc',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: '1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  outline: 'none',
  transition: 'border-color 0.3s',
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: '#2684FF',
  boxShadow: '0 0 5px rgba(38, 132, 255, 0.5)',
};

const buttonStyle: React.CSSProperties = {
  padding: '14px',
  backgroundColor: '#2684FF',
  color: 'white',
  fontSize: '1.15rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '12px',
  width: '100%',
  boxShadow: '0 3px 8px rgba(38, 132, 255, 0.48)',
  transition: 'background-color 0.3s ease',
  fontWeight: 600,
};

const errorTextStyle: React.CSSProperties = {
  color: '#e74c3c',
  marginTop: 8,
  fontSize: '0.9rem',
};

const formContainerStyle: React.CSSProperties = {
  maxWidth: 420,
  margin: '50px auto',
  padding: 25,
  border: '1px solid #ddd',
  borderRadius: 14,
  boxShadow: '0 6px 12px rgba(0,0,0,0.07)',
  backgroundColor: '#fff',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const labelStyle: React.CSSProperties = {
  marginTop: 12,
  display: 'block',
  fontWeight: 600,
  color: '#333',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundColor: '#fff',
  backgroundImage:
    'url(data:image/svg+xml;charset=US-ASCII,<svg height="10" width="10" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L5 7 L10 0 Z" fill="%23666"/></svg>)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: '10px',
  cursor: 'pointer',
};

interface CandidateFormProps {
  onRegistered: (id: string) => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onRegistered }) => {
  useEffect(() => {
    console.log('CandidateForm mounted');
  }, []);

  const [form, setForm] = useState({ name: '', email: '', phone: '', domain: '', experience: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string>('');

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.domain.trim()) newErrors.domain = 'Domain is required';
    if (!form.experience) newErrors.experience = 'Select experience range';
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
      }
      setLoading(true);
      setSubmitError('');
      try {
          await new Promise(res => setTimeout(res, 1000));
          onRegistered('mocked-id-1234');
      } catch (error: any) {
          setSubmitError(`Failed to register candidate: ${error.message || 'Unknown error'}`);
      } finally {
          setLoading(false);
      }
  }

          
  return (
    <form onSubmit={handleSubmit} style={formContainerStyle} noValidate>
      <h2 style={{ marginBottom: 22, textAlign: 'center', color: '#2E86C1' }}>Register Candidate</h2>

      <label style={labelStyle} htmlFor="name">
        Full Name
      </label>
      <input
        id="name"
        name="name"
        placeholder="Enter full name"
        style={{ ...inputStyle, ...(focusedField === 'name' ? inputFocusStyle : {}) }}
        value={form.name}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        aria-invalid={!!errors.name}
        aria-describedby="name-error"
      />
      {errors.name && (
        <div id="name-error" style={errorTextStyle}>
          {errors.name}
        </div>
      )}

      <label style={labelStyle} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Enter email address"
        style={{ ...inputStyle, ...(focusedField === 'email' ? inputFocusStyle : {}) }}
        value={form.email}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        aria-invalid={!!errors.email}
        aria-describedby="email-error"
      />
      {errors.email && (
        <div id="email-error" style={errorTextStyle}>
          {errors.email}
        </div>
      )}

      <label style={labelStyle} htmlFor="phone">
        Phone Number (optional)
      </label>
      <input
        id="phone"
        name="phone"
        placeholder="Enter phone number"
        style={{ ...inputStyle, ...(focusedField === 'phone' ? inputFocusStyle : {}) }}
        value={form.phone}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={!!errors.phone}
      />

      <label style={labelStyle} htmlFor="domain">
        Domain
      </label>
      <input
        id="domain"
        name="domain"
        placeholder="Enter domain e.g. Excel"
        style={{ ...inputStyle, ...(focusedField === 'domain' ? inputFocusStyle : {}) }}
        value={form.domain}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        aria-invalid={!!errors.domain}
        aria-describedby="domain-error"
      />
      {errors.domain && (
        <div id="domain-error" style={errorTextStyle}>
          {errors.domain}
        </div>
      )}

      <label style={labelStyle} htmlFor="experience">
        Experience Range
      </label>
      <select
        id="experience"
        name="experience"
        style={{ ...selectStyle, ...(focusedField === 'experience' ? inputFocusStyle : {}) }}
        value={form.experience}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        aria-invalid={!!errors.experience}
        aria-describedby="experience-error"
      >
        <option value="" disabled>
          Select Experience Range
        </option>
        <option value="0-2">0-2 years</option>
        <option value="2-5">2-5 years</option>
        <option value="5-8">5-8 years</option>
        <option value="8+">8+ years</option>
      </select>
      {errors.experience && (
        <div id="experience-error" style={errorTextStyle}>
          {errors.experience}
        </div>
      )}

      <button type="submit" disabled={loading} style={buttonStyle} aria-busy={loading}>
        {loading ? 'Registering...' : 'Register Candidate'}
      </button>

      {submitError && <p style={errorTextStyle}>{submitError}</p>}
    </form>
  );
};

export default CandidateForm;
