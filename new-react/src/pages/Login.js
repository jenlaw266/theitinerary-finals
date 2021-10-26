import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { Link, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import PropTypes from 'prop-types';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      email,
      password,
      title
    });
    console.log('token', token)
    setToken(token);
  }

  async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

  const { url } = useRouteMatch();

  useEffect(() => {
    setTitle(url === "/login" ? "Login" : "Register");
  }, [url]);

  const toggle = url === "/login" ? "register" : "login";

  return (
    <div>
      <h1>{title}</h1>

      <form noValidate onSubmit={handleSubmit}>
        <TextField
            required
            id="outlined-required"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Button variant="outlined" component={Link} to={`/${toggle}`}>
        {toggle}
      </Button>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;
