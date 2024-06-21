import { getUser } from "../utils/helpers";

const Home = () => {
  const user = getUser();
  return (
    <div>
      <h3>Welcome {user.email}</h3>

      <div className="grider">
        <div className="card">
          <div className="card-body">
            <div className="title">0</div>
            <div className="sub-text">My Applications</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">0</div>
            <div className="sub-text">Firearms Owned</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="title">0</div>
            <div className="sub-text">Pending Renewals</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
