
import axios from 'axios';

const API_URL = 'https://ancient-reaches-96103-ae8ed803e107.herokuapp.com';

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
    const response = await axios.post(
        `${API_URL}/callback`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      const { access_token } = response.data;
      return access_token;
  };
  
  export const createPlaylist = async (answers, spotifyToken) => {
    try {
        const response = await axios.post(
          `${API_URL}/api/playlist`,
          { answers, spotifyToken },
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              'Content-Type': 'application/json'
            }
          }
        );
    
        return response.data.playlist.external_urls.spotify;
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

