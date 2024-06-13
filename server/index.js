const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/client_id', (req, res) => {
  res.json({ clientId: process.env.SPOTIFY_CLIENT_ID });
});

app.post('/callback', async (req, res) => {
  const code = req.body.code;
  console.log('code at server: ' + code);
  console.log('auth at server: Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')));

  const redirectUri = 'http://localhost:3000/callback'; 

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        }
      }
    );

    console.log('access_token at callback: ' + response.data.access_token);
    console.log('SCOPE at callback: ' + response.data.scope);

    const { access_token } = response.data;
    res.json({ access_token });
  } catch (error) {
    console.error('Error during callback:', error.response.data);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/playlist', async (req, res) => {
  const { answers, spotifyToken } = req.body;

  try {
    console.log('token: ' + spotifyToken);

    /*const topArtistsResponse = await axios.get('https://api.spotify.com/v1/1su99sy2tc3mtazqdb5w5che8/top/artists', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: 10
      }
    });
    const topArtistsResponse = await axios.get('https://api.spotify.com/v1/1su99sy2tc3mtazqdb5w5che8/top/artists', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: 5 // Limit to retrieve (adjust as needed)
      }
    });

    console.log('Top artists:', topArtistsResponse);
    const topArtistIds = topArtistsResponse.data.items.map(artist => artist.id);
    console.log('join' + topArtistIds.join(','));*/

/*
    const topArtistIds = topArtistsResponse.data.items.map(artist => artist.id);

    // Step 3: Get user's top tracks
    const topTracksResponse = await axios.get('https://api.spotify.com/v1/1su99sy2tc3mtazqdb5w5che8/top/tracks', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: 10 // Limit to retrieve (adjust as needed)
      }
    });

    const topTrackUris = topTracksResponse.data.items.map(track => track.uri);*/

    const playlistResponse = await axios.post('https://api.spotify.com/v1/users/1su99sy2tc3mtazqdb5w5che8/playlists', {
      name: 'Tu playlist personalizada',
      description: 'Generada a través de tus respuestas.',
      public: true
    }, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json'
      }
    });

    const playlistId = playlistResponse.data.id;

    const recommendationsResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      },
      params: {
        /*seed_artists: topArtistIds.join(','),
        seed_genres: topGenres.join(','),
        seed_tracks: topTrackUris.join(','),*/
        seed_artists: '3jU5LKRsimuyZjA0lSkdPp,3bvfu2KAve4lPHrhEFDZna',
        seed_tracks: '2cO7VT0O6Q8IYeLNrh6oa9',
        limit: 24 
      }
    });
    
    
    const obviousRecommendation = await axios.get('https://api.spotify.com/v1/tracks/2cO7VT0O6Q8IYeLNrh6oa9', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      }
    });
        
    
    const trackUris = recommendationsResponse.data.tracks.map(track => track.uri);
    const obviousRecommendationUri = obviousRecommendation.data.uri;

    const randomPosition = Math.floor(Math.random() * 24);
    trackUris.splice(randomPosition, 0, obviousRecommendationUri);
    
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      uris: trackUris
    }, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ message: 'Playlist created!', playlist: playlistResponse.data });
  } catch (error) {
    console.error('Error creating playlist:', error.response?.data || error.message);
    if (error.response && error.response.status === 401) {
      res.status(401).json({ error: 'Unauthorized. Invalid access token.' });
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
