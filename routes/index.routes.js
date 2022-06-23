const router = require("express").Router();


const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/artist-search", (req, res, next) => {

  const { artist } = req.query

  spotifyApi
    .searchArtists(artist)
    .then(data => {

      const artist_info = data.body.artists.items

      res.render('artist-search', { artist_info })
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));


})

router.get('/albums/:artist_id', (req, res, next) => {

  const { artist_id } = req.params

  spotifyApi
    .getArtistAlbums(artist_id)
    .then(album => {
      const album_info = album.body.items
      console.log(album_info)
      res.render('albums', { album_info })
    })
    .catch(error => console.log(error));
});

router.get('/tracks/:tracks_id', (req, res, next) => {

  const { tracks_id } = req.params

  spotifyApi
    .getAlbumTracks(tracks_id)
    .then(album => {
      const tracks_info = album.body.items
      console.log(tracks_info)
      res.render('tracks', { tracks_info })
    })
    .catch(error => console.log(error));
});
module.exports = router;
