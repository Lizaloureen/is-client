import { useEffect, useState } from "react";
import { getToken, getUser } from "../utils/helpers";
import axios from "axios";

const Home = () => {
  const [stats, setStats] = useState({});
  const user = getUser();

  const getApplicationStats = async () => {
    const token = getToken();

    const res = await axios.get("http://127.0.0.1:8000/client/dash-stats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = res.data;
    setStats(data.data);
  };

  useEffect(() => {
    getApplicationStats();
  }, []);
  return (
    <div>
      <h3 style={{ color: "white" }}>Welcome {user.email}</h3>
      {/* <div className="container-fluid w-full">
        <img
          src="https://www.therange702.com/wp-content/uploads/2019/12/handgun-and-bullets.jpg"
          className="img-fluid"
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          alt="..."
        />
      </div>{" "} */}
      <br />
      <div className="grider">
        <div className="card">
          <div className="card-body">
            <div className="title" style={{ color: "black" }}>
              {stats.application}
            </div>
            <div className="sub-text" style={{ color: "black" }}>
              My Applications
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title" style={{ color: "black" }}>
              {stats.firearms}
            </div>
            <div className="sub-text" style={{ color: "black" }}>
              Firearms Owned
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title" style={{ color: "black" }}>
              {stats.renewal}
            </div>
            <div className="sub-text" style={{ color: "black" }}>
              Pending Renewals
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title" style={{ color: "black" }}>
              {stats.licence}
            </div>
            <div className="sub-text" style={{ color: "black" }}>
              Active Licences
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
