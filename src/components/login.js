import React, { useState } from 'react';
import { TextField, Button, Container, Paper } from '@mui/material';
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const [authenticated, setAuthenticated] = useState(
  //   localStorage.getItem("authenticated") === "true"
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, ${errorMessage}`);
      }

      const data = await response.json();
      if (data['token']) {
        console.log('Login successful');
        // setAuthenticated(true);
        // localStorage.setItem("authenticated", true);
        navigate("/products");
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="login-paper">
          <p className='styleText2'>Welcome to Shopping Mania</p>
          <p className='styleText'> Login Page </p>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
          </form>
          <section className='spacer'></section>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;
