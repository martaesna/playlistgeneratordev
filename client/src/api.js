
import axios from 'axios';

const API_URL = 'https://ancient-reaches-96103.herokuapp.com';

export const getClientId = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/client_id`);
      return response.data.clientId;
    } catch (error) {
      console.error('Error fetching client ID:', error);
      throw error;
    }
  };
  
  export const exchangeCodeForToken = async (code) => {
    const redirectUri = 'http://localhost:3000/callback'; // Update with your actual redirect URI
    try {
      const authHeader = `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`;
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: authHeader
          }
        }
      );
      console.log('access_token at callback:', response.data.access_token);
      console.log('SCOPE at callback:', response.data.scope);
      return response.data.access_token;
    } catch (error) {
      console.error('Error during callback:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const createPlaylist = async (spotifyToken) => {
    try {
      const playlistResponse = await axios.post(
        'https://api.spotify.com/v1/users/1su99sy2tc3mtazqdb5w5che8/playlists',
        {
          name: 'Tu playlist personalizada',
          description: 'Generada a través de tus respuestas.',
          public: true
        },
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return playlistResponse.data;
    } catch (error) {
      console.error('Error creating playlist:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const getRecommendations = async (spotifyToken) => {
    try {
      const recommendationsResponse = await axios.get(
        'https://api.spotify.com/v1/recommendations',
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`
          },
          params: {
            seed_artists: '3jU5LKRsimuyZjA0lSkdPp,3bvfu2KAve4lPHrhEFDZna',
            seed_tracks: '2cO7VT0O6Q8IYeLNrh6oa9',
            limit: 24
          }
        }
      );
      return recommendationsResponse.data.tracks;
    } catch (error) {
      console.error('Error fetching recommendations:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const addTrackToPlaylist = async (playlistId, trackUris, spotifyToken) => {
    try {
      const randomPosition = Math.floor(Math.random() * trackUris.length);
      trackUris.splice(randomPosition, 0, 'spotify:track:2EP6MHyuILtKBJYxsjewms'); // Add obvious recommendation
  
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: trackUris },
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return { message: 'Tracks added to playlist successfully!' };
    } catch (error) {
      console.error('Error adding tracks to playlist:', error.response?.data || error.message);
      throw error;
    }
  };

