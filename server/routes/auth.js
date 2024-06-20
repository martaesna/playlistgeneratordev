const express = require("express");
const router = express.Router();
const fecth = require("node-fetch");
const encodeFormData = require("../helperFunctions/encodeFormData.js");
const querystring = require("querystring");

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

module.exports = encodeFormData

router.get("/login", async (req, res) => {
    let scope = "user-modfiy-playback-state user-read-playback-state user-read-currently-playing user-library-modify user-library-read playlist-read-private playlist-modify-public";
    res.redirect(`https://accounts.spotify.com/authorize?clinet_id=${proccess.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.redirecturi}&scope=${scope}&show_dialog=true`);
})

router.get("/logged", async (req, res) => {
    let body = {
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: process.env.REDIRECTURI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }

    await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: encodeFormData(body)
    })
    .then(resp => resp.json())
    .then(data => {
        let query = querystring.stringify(data);
        res.redirect(`https://martaesna.github.io/PlaylistGenerator/${query}`)
    });
})