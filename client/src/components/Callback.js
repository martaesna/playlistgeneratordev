import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '../api';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const storedState = window.localStorage.getItem('spotify_auth_state');

    const exchangeToken = async () => {
      if (state !== storedState) {
        navigate('/?error=state_mismatch');
      } else {
        window.localStorage.removeItem('spotify_auth_state');
        try {
          const accessToken = await exchangeCodeForToken(code);
          window.localStorage.setItem('token', accessToken);
          navigate('/questions');
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          navigate('/?error=invalid_token');
        }
      }
    };

    exchangeToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
