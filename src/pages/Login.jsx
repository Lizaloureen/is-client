import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = { password: password, username: email };
    try {
      const url = "http://127.0.0.1:8000/auth/login";
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(url, formData, headers);
      const data = res.data;
      console.log("data", data);
      if (data?.data) {
        localStorage.setItem("isToken", data.data.token);
        localStorage.setItem("isTokenData", JSON.stringify(data.data.user));
        window.location.href = "/";
        alert("Login successful");
      }
      console.log("data", data);
    } catch (error) {
      console.log("The Error", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="main flex-center">
      <div className="mid-container m-xl">
        <h1 className="flex-center">Login Form</h1>
        <h4 className="flex-center"> Welcome back to the Firearm Portal</h4>
        <form className="m-l p-l" onSubmit={handleLogin}>
          <div className="flex-column">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex-column">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex-column">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p>
              Have no account? <Link to="/signup">Sign Up</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
