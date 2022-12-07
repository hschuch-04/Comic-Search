const path = require('path')
const express = require('express')
const config = require("dotenv").config()
const md5 = require('md5')
const axios = require('axios')
const app = express()
const port = 3000

// KEYS
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC
const MARVEL_PRIVATE_KEY = process.env.MARVEL_SECRET
const NEWS_API_KEY = process.env.NEWS_KEY

// Serve out any static assets correctly
app.use(express.static('../client/build'))

// Comic Book and News Search Endpoint
app.get('/comic/:name', (req, res) => {

  // Create the endpoint information
  const ts = new Date().getTime();
  const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

  // Get Request
  axios.get(`https://gateway.marvel.com/v1/public/series?title=${req.params.name}&contains=comic&limit=1&ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`)
    .then((response) => {
      axios.get(`https://newsapi.org/v2/everything?q=${response.data.data.results[0].characters.items[0].name}%20Marvel&language=en&sortBy=publishedAt&pageSize=1&apiKey=${NEWS_API_KEY}`)
        .then((news) => {
          res.send({ series: response.data, news: news.data })
        })
        .catch((error) => {
          res.send(error)
        })
    })
    .catch((error) => {
      res.send(error)
    })
})

// The endpoint for wiki links
app.get('/wiki/:creator', (req, res) => {
  // Create the endpoint
  const link = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=allpages&inprop=url&gapfrom=${req.params.creator}&gaplimit=1`;
  axios.get(link)
    .then((response) => {
      res.send(response.data.query)
    })
    .catch((error) => {
      res.send(error)
    })

})


// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
