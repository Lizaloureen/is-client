import axios from 'axios';
import React, { useState } from 'react';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    surname:'',
    ID_number:'',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    user_type: 'Client'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
        const url = "http://127.0.0.1:8000/auth/register";
        const headers = {
            "Content-Type": "application/json",
        };
        const res = await axios.post(url, formData, headers);
        const data = res.data;
        if (data.success) {
          alert('Registration successful');
          window.location.href = '/login';
        }

        console.log("data", data);
    }   catch (error) {
        console.log("The Error",error);
    } 
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="main flex-center">
    <div className="mid-container m-xl">
      <h2 className="flex-center">Register</h2>
      <form className="m-l p-l" onSubmit={handleSubmit}>
        <div className='input-group'>

        <div className="flex-column w-50">
          <label htmlFor="firstname">First Name</label>
          <input className="input"
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column w-50">
          <label htmlFor="last_name">Last Name</label>
          <input className="input"
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <div className="flex-column">
          <label htmlFor="surname">Surname</label>
          <input className="input"
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="ID_number">ID Number</label>
          <input className="input"
            type="text"
            id="ID_number"
            name="ID_number"
            value={formData.ID_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="email">Email</label>
          <input className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="email">Phone Number</label>
          <input className="input"
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="password">Password</label>
          <input className="input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className="input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationPage;
