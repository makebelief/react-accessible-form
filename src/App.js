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
