import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = window.localStorage.getItem('spotify_auth_state');

    if (state !== storedState) {
      navigate('/?error=state_mismatch');
    } else {
      window.localStorage.removeItem('spotify_auth_state');
      axios.post('http://localhost:5000/callback', { code })
        .then(response => {
          const { access_token } = response.data;
          window.localStorage.setItem('token', access_token);
          navigate('/questions');
        })
        .catch(error => {
          console.error('Error during callback:', error);
          navigate('/?error=invalid_token');
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
