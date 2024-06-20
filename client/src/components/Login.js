import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClientId } from '../api';
import './css/Login.css';

const Login = ({ token }) => {
  const navigate = useNavigate();
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const clientId = await getClientId();
        //const clientId = response.data.clientId;
        const redirectUri = 'https://martaesna.github.io/PlaylistGenerator/callback'; 
        const scope = 'user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-modify user-library-read playlist-read-private playlist-modify-public playlist-modify-private user-top-read'
        const state = Math.random().toString(36).substring(2, 15); 
        window.localStorage.setItem('spotify_auth_state', state); 
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
        setAuthUrl(authUrl);
      } catch (error) {
        console.error('Error fetching client ID:', error);
      }
    };

    fetchClientId();
  }, []);

  if (token) {
    navigate('/questions');
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Descubre tu playlist de Spotify según tu personalidad</h1>
      <p className="login-description">Contesta unas preguntas y recibirás una playlist a medida que representará al 100% tu forma de ser</p>
      {!token ? (
        <a href={authUrl} className="login-button">Iniciar sesión con Spotify</a>
      ) : (
        <p>Redireccionando...</p>
      )}
    </div>
  );
};

export default Login;
