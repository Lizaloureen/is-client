import React, { useEffect, useState } from "react";
import { getToken } from "../utils/helpers";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({});

  const getUserProfile = async () => {
    const token = getToken();

    const res = await axios.get("http://127.0.0.1:8000/client/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = res.data;
    console.log("data", data);
    setProfileData(data.data);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="w-container">
      <h1 style={{ color: "white" }}>My Profile Page</h1>
      <div className="mid-container m-l p-l">
        My Data: <br /> <br />
        <p>
          <strong>ID Number:</strong> {profileData.ID_Number}
        </p>
        <p>
          <strong>First Name:</strong> {profileData.first_Name}
        </p>
        <p>
          <strong>ID:</strong> {profileData.id}
        </p>
        <p>
          <strong>Last Name:</strong> {profileData.last_Name}
        </p>
        <p>
          <strong>Phone Number:</strong> {profileData.phone_number}
        </p>
        <p>
          <strong>Surname:</strong> {profileData.surname}
        </p>
        <p>
          <strong>User ID:</strong> {profileData.user}
        </p>
        <p>
          <strong>User Email:</strong> {profileData.user_email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
