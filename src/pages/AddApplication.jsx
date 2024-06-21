import axios from 'axios';
import React, { useState } from 'react'
import { getToken } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AddApplication = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        next_of_kin_name: '',
        address: '',
        reason: '',
        type_of_firearm: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const token = getToken()
          const headers= {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          }
          const response = await axios.post('http://127.0.0.1:8000/client/apply', formData, { headers });
          const data = response.data;
          if (data.success) {
            alert('Application submitted successfully');
            console.log('Application submitted successfully:', response.data);
            setFormData({
              next_of_kin_name: '',
              address: '',
              reason: '',
              type_of_firearm: '',
            }); // clear form
            navigate('/applications')
          }else {
            alert('Failed to submit application');
            console.error('Failed to submit application:', response.data);
          }
        } catch (error) {
          console.error('Error submitting application:', error);
        }
      };
  return (

    <div>
        <h3 className='flex-center'>Add application</h3>
        <form onSubmit={handleSubmit}>
            
            <label htmlFor = "firearm-type">Firearm Type</label>
            <select id = "firearm-type" name='type_of_firearm' required value={formData.type_of_firearm}  className='input' onChange={handleChange}>
                <option value = "">--Select---</option>
                <option value = "handgun">Handgun</option>
                <option value = "shotgun">Shotgun</option>
                <option value = "rifle">Rifle</option>
            </select>
            
            <label htmlFor="reason">Reason for Firearm</label>
            <textarea onChange={handleChange} name='reason' value={formData.reason}>Reason</textarea>
            
            <label htmlFor = "Next Of Kin">Next of Kin Name</label>
            <input onChange={handleChange} name='next_of_kin_name' value={formData.next_of_kin_name} type = "text" id = "next_of_kin_name" placeholder="Next Of Kin name"/>

            <label htmlFor = "address">Address</label>
            <textarea  onChange={handleChange} name='address' value={formData.address}>Enter your Address</textarea>

            <button type='submit'>Submit</button>
            </form>
    </div>
  )
}

export default AddApplication