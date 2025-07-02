import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
    } else {
      alert(`Thank you, ${formData.name}!`);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <main className="form-wrapper">
      <form onSubmit={handleSubmit} aria-labelledby="formTitle" noValidate>
        <h1 id="formTitle">Contact Us</h1>

        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} aria-required="true" aria-invalid={errors.name ? "true" : "false"} />
        {errors.name && <p className="error" role="alert">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} aria-required="true" aria-invalid={errors.email ? "true" : "false"} />
        {errors.email && <p className="error" role="alert">{errors.email}</p>}

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} aria-required="true" aria-invalid={errors.message ? "true" : "false"} />
        {errors.message && <p className="error" role="alert">{errors.message}</p>}

        <button type="submit">Submit</button>

        {submitted && <p className="success" role="status">Message sent successfully</p>}
      </form>
    </main>
  );
}

export default App;
