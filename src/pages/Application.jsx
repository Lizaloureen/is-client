import { Link } from "react-router-dom";
import { getToken } from "../utils/helpers";
import axios from "axios";
import { useEffect, useState } from "react";

const Application = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [stats, setStats] = useState([]);

  const getApplications = async () => {
    const token = getToken();

    const res = await axios.get("http://127.0.0.1:8000/client/applications", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = res.data;
    setApplicationData(data.data);
  };

  const getApplicationStats = async () => {
    const token = getToken();

    const res = await axios.get("http://127.0.0.1:8000/client/applications/stats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = res.data;
    setStats(data.data);
  };
  
  useEffect(() => {
    getApplications();
    getApplicationStats();
  }, []);

  const handleButtonClick = () => {
    history.push("/new-page");
  };
  
  return (
    <div>
      <h3>Applications</h3>
      <div className="grider">
        <div className="card">
          <div className="card-body">
            <div className="title">{stats?.pending}</div>
            <div className="sub-text">Pending Applications</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">{stats?.approved}</div>
            <div className="sub-text">Approved Applications</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">{stats?.pending_interview}</div>
            <div className="sub-text">Awaiting Interview</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">{stats?.rejected}</div>
            <div className="sub-text">Rejected Applications</div>
          </div>
        </div>
      </div>
      <br />

      <div className="flex-apart" style={{ marginBottom: "10px" }}>
        <h3>My Applications</h3>
        <Link to="/applications/add">Add Application</Link>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>              
              <th>Applicant Name</th>
              <th>Reason</th>
              <th>Firearm Type</th>
              <th>Next of Kin</th>
              <th>Submitted On</th>
              <th>Interview On</th>
              <th>Application Status</th>
            </tr>
          </thead>
          <tbody>
            {applicationData?.map((application, index) => (
              <tr key={index+1}>
                <td>{application.client.first_Name} {application.client.last_Name}</td>
                <td>{application.reason}</td>
                <td>{application.type_of_firearm}</td>
                <td>{application.next_of_kin_name}</td>
                <td>{new Date(application.create_at).toLocaleString()}</td>
                <td>{application.interview_date ? (new Date(application.interview_date).toLocaleString())  : '--'}</td>
                <td>{application.status}</td>
              </tr>
            )
              )}
          </tbody>
        </table>
      </div>

      <br />
    </div>
  );
};

export default Application;
