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
        {/* Academic Information Section */}
        <fieldset className="form-section">
          <legend>Academic Information</legend>
          
          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <select 
              id="course" 
              name="course" 
              value={formData.course} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.course ? "true" : "false"}
            >
              <option value="">Select your course</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <p className="error" role="alert">{errors.course}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="yearOfStudy">Year of Study *</label>
            <input 
              id="yearOfStudy" 
              name="yearOfStudy" 
              type="number" 
              min="1" 
              max="8" 
              value={formData.yearOfStudy} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.yearOfStudy ? "true" : "false"}
              placeholder="Enter year (1-8)"
            />
            {errors.yearOfStudy && <p className="error" role="alert">{errors.yearOfStudy}</p>}
          </div>

          <fieldset className="radio-group">
            <legend>Enrollment Type *</legend>
            <div className="radio-options">
              <div className="radio-option">
                <input 
                  id="fullTime" 
                  name="enrollmentType" 
                  type="radio" 
                  value="full-time" 
                  checked={formData.enrollmentType === 'full-time'}
                  onChange={handleChange}
                  aria-required="true"
                />
                <label htmlFor="fullTime">Full-time</label>
              </div>
              <div className="radio-option">
                <input 
                  id="partTime" 
                  name="enrollmentType" 
                  type="radio" 
                  value="part-time" 
                  checked={formData.enrollmentType === 'part-time'}
                  onChange={handleChange}
                  aria-required="true"
                />
                <label htmlFor="partTime">Part-time</label>
              </div>
            </div>
            {errors.enrollmentType && <p className="error" role="alert">{errors.enrollmentType}</p>}
          </fieldset>
        </fieldset>
        {/* Account Information Section */}
        <fieldset className="form-section">
          <legend>Account Information</legend>
          
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input 
              id="username" 
              name="username" 
              type="text" 
              value={formData.username} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.username ? "true" : "false"}
              placeholder="Choose a username"
            />
            {errors.username && <p className="error" role="alert">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="Create a password"
            />
            {errors.password && <p className="error" role="alert">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={formData.confirmPassword} 
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="error" role="alert">{errors.confirmPassword}</p>}
          </div>
        </fieldset>
        {/* Terms and Conditions */}
        <fieldset className="form-section">
          <legend>Terms and Conditions</legend>
          
          <div className="checkbox-group">
            <input 
              id="agreeToTerms" 
              name="agreeToTerms" 
              type="checkbox" 
              checked={formData.agreeToTerms}
              onChange={handleChange}
              aria-required="true" 
              aria-invalid={errors.agreeToTerms ? "true" : "false"}
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="#" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and <a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a> *
            </label>
          </div>
          {errors.agreeToTerms && <p className="error" role="alert">{errors.agreeToTerms}</p>}
        </fieldset>
