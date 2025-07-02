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
