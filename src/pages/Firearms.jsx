import axios from "axios";
import { getToken } from "../utils/helpers";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import FireTable from "../components/FireTable";

const Firearms = () => {
  const [firearmsData, setFirearmsData] = useState([]);
  const [firearmsDataStat, setFirearmsDataStat] = useState({});

  const getFirearms = async () => {
    try {
      const token = getToken();

      const res = await axios.get("http://localhost:8000/client/firearms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const data = res.data;
      setFirearmsData(data.data);
      setFirearmsDataStat(data.fa_data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getFirearmStat = async () => {
  //   try {
  //     const token = getToken();

  //     const res = await axios.get("http://localhost:8000/client/firearms/stat", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     const data = res.data;
  //     setFirearmsDataStat(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getFirearms();
    // getFirearmStat()
  }, []);

  return (
    <div>
      <h3 style={{ color: "white" }}>Firearms</h3>
      <div className="grider">
        <div className="card">
          <div className="card-body">
            <div className="title" style={{ color: "black" }}>
              {firearmsDataStat?.total}
            </div>
            <div className="sub-text" style={{ color: "black" }}>
              Number of firearms owned
            </div>
          </div>
        </div>
      </div>
      <br />
      <div style={{ paddingTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "white" }}>My Firearms</h3>
        </div>

        <div
          style={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        >
          <FireTable firearmsData={firearmsData} />
        </div>
      </div>
    </div>
  );
};

export default Firearms;
