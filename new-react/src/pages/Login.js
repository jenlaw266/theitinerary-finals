import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router";
import { Link, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { animationPages } from "../animations/index.js"
import "../styles/login.scss";
import loginImage from "../images/loading2.gif";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 1 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Login = ({ setToken, setDisplayName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      email,
      password,
      title,
    });
    setToken(token);
    history.push("/");
  };

  async function loginUser(credentials) {
    return fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const { url } = useRouteMatch();

  useEffect(() => {
    setQuestion(url === "/login" ? "Sign up!" : "Already an explorer?");
    setTitle(url === "/login" ? "Login" : "Register");
  }, [url]);

  const toggle = url === "/login" ? "register" : "login";

  return (
    <motion.div initial="out" animate="end" exit="out" variants={animationPages}>
      <div>
        <img className="login-image" src={loginImage} alt="login-image" />
        <h1 className="login-title">{title}</h1>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="login-user-pass">
            <TextField
              required
              id="outlined-user-input"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <Button variant="outlined" type="submit">
            SUBMIT 
          </Button>
        </form>
        <div className="login-status-question">{question}</div>
        <Button variant="outlined" component={Link} to={`/${toggle}`}>
          {toggle}      
        </Button>
      </div>
    </motion.div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
