# Spotify Playlist Generator

Spotify Playlist Generator is a web application that creates a personalized Spotify playlist based on a personality quiz. Users authenticate with their Spotify accounts and answer a series of questions, after which a unique playlist is generated for them.

## Features

- Spotify Authentication
- Personality quiz with images
- Personalized playlist generation on Spotify
- Attractive and user-friendly interface

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Authentication**: Spotify OAuth
- **Styling**: CSS

## Prerequisites

Before starting, make sure you have the following installed:

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)
- Spotify Developer Account (https://developer.spotify.com/)

## Project Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/spotify-playlist-generator.git
    cd spotify-playlist-generator
    ```

2. Install dependencies for the frontend and backend:

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Create a `.env` file in the `server` folder with the following environment variables:

    ```plaintext
    SPOTIFY_CLIENT_ID=your_spotify_client_id
    SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    REDIRECT_URI=http://localhost:3000/callback
    ```

4. Start the backend server:

    ```bash
    cd server
    npm start
    ```

5. Start the frontend application:

    ```bash
    cd client
    npm start
    ```

The application should be running at `http://localhost:3000`.

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Click "Login with Spotify" to authenticate.
3. Answer the quiz questions.
4. After completing the quiz, a personalized playlist will be generated in your Spotify account.

## Contributions

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make the necessary changes and commit (`git commit -m 'Add new feature'`).
4. Push the changes (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
