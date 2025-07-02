import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    course: '',
    yearOfStudy: '',
    enrollmentType: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const courses = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Psychology',
    'Medicine',
    'Arts & Literature',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  const validate = () => {
    const newErrors = {};
    
    // Personal Info validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    
    // Academic Info validation
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.yearOfStudy.trim()) {
      newErrors.yearOfStudy = 'Year of study is required';
    } else if (isNaN(formData.yearOfStudy) || formData.yearOfStudy < 1 || formData.yearOfStudy > 8) {
      newErrors.yearOfStudy = 'Please enter a valid year (1-8)';
    }
    if (!formData.enrollmentType) newErrors.enrollmentType = 'Please select enrollment type';
    
    // Account Info validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Consent validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log('Form submitted successfully:', formData);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      course: '',
      yearOfStudy: '',
      enrollmentType: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
    setErrors({});
    setSubmitted(false);
  };
  if (submitted) {
    return (
      <main className="form-wrapper">
        <div className="success-message">
          <h1>Registration Successful! 🎉</h1>
          <p>Welcome to our LMS platform, <strong>{formData.fullName}</strong>!</p>
          <p>Your account has been created successfully. You will receive a confirmation email shortly.</p>
          <button 
            type="button" 
            onClick={() => setSubmitted(false)}
            className="btn-secondary"
          >
            Register Another Student
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="form-wrapper">
      <form onSubmit={handleSubmit} aria-labelledby="formTitle" noValidate>
        <h1 id="formTitle">Student Registration Form</h1>
        <p className="form-description">Join our Learning Management System</p>
        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend>Personal Information</legend>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input 
              id="fullName" 
              name="fullName" 
              type="text" 
              value={formData.fullName} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.fullName ? "true" : "false"}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="error" role="alert">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="error" role="alert">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input 
              id="phoneNumber" 
              name="phoneNumber" 
              type="tel" 
              value={formData.phoneNumber} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.phoneNumber ? "true" : "false"}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="error" role="alert">{errors.phoneNumber}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select 
              id="gender" 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.gender ? "true" : "false"}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="error" role="alert">{errors.gender}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth *</label>
            <input 
              id="dateOfBirth" 
              name="dateOfBirth" 
              type="date" 
              value={formData.dateOfBirth} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
            />
            {errors.dateOfBirth && <p className="error" role="alert">{errors.dateOfBirth}</p>}
          </div>
        </fieldset>
