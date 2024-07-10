import axios from "axios";
import React, { useState } from "react";
import { getToken } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import counties from "../utils/counties";
import fa_types from "../utils/firearmsTypes";

const AddApplication = () => {
  const navigate = useNavigate();
  const [goodConduct, setGoodConduct] = useState("");
  const [formData, setFormData] = useState({
    next_of_kin_name: "",
    address: "",
    reason: "",
    type_of_firearm: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      };
      formData["good_conduct"] = goodConduct;

      const response = await axios.post(
        "http://127.0.0.1:8000/client/apply",
        formData,
        { headers }
      );
      const data = response.data;
      if (data.success) {
        alert("Application submitted successfully");
        console.log("Application submitted successfully:", response.data);
        setFormData({
          next_of_kin_name: "",
          address: "",
          reason: "",
          type_of_firearm: "",
        }); // clear form
        navigate("/applications");
      } else {
        alert("Failed to submit application");
        console.error("Failed to submit application:", response.data);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "50px",
          color: "black",
        }}
      >
        <h3 className="flex-center">Add application</h3>

        <label htmlFor="firearm-type">Firearm Type</label>
        <select
          id="firearm-type"
          name="type_of_firearm"
          required
          value={formData.type_of_firearm}
          className="input"
          onChange={handleChange}
        >
          <option value="">--Select---</option>
          {fa_types.map((fa, index) => (
            <option key={index} value={fa}>
              {fa}
            </option>
          ))}
        </select>

        <label htmlFor="reason">Reason for Firearm</label>
        <textarea
          onChange={handleChange}
          name="reason"
          required
          value={formData.reason}
        >
          Reason
        </textarea>

        <label htmlFor="Next Of Kin">Next of Kin Name</label>
        <input
          onChange={handleChange}
          name="next_of_kin_name"
          required
          value={formData.next_of_kin_name}
          type="text"
          id="next_of_kin_name"
          placeholder="Next Of Kin name"
        />

        <label htmlFor="address">Address</label>
        <textarea
          onChange={handleChange}
          name="address"
          required
          value={formData.address}
        >
          Enter your Address
        </textarea>

        <label htmlFor="region">Region *</label>
        <select
          id="region"
          name="region"
          required
          value={formData.region}
          className="input"
          onChange={handleChange}
        >
          <option value="">--Select---</option>
          {counties.map((county, i) => (
            <option key={i} value={county.name}>
              {county.name}
            </option>
          ))}
        </select>

        <label htmlFor="goodConduct">Attach Good Conduct *</label>
        <input
          id="goodConduct"
          name="goodConduct"
          type="file"
          onChange={(e) => setGoodConduct(e.target.files[0])}
          accept=".pdf"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddApplication;
