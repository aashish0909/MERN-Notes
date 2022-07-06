import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Signup = () => {
  let history = useHistory();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    setcredentials({ name: "", email: "", password: "", cpassword: "" });

    const res = await axios.post("http://localhost:5000/api/auth/createuser", {
      name: name,
      password: password,
      email: email,
    });
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuthenticated", true);
      history.push("/");
    } else {
    }
  };

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  useEffect(() => {
    if (isAuthenticated) history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            value={credentials.name}
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credentials.email}
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            value={credentials.password}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Password
          </label>
          <input
            type="cpassword"
            onChange={onChange}
            value={credentials.cpassword}
            className="form-control"
            id="cpassword"
            name="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
