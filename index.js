require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const URLShortenerService = require('./application/services/URLshortener.service');
// Basic Configuration
const port = process.env.PORT || 3000;
const dns = require('dns');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

const service = new URLShortenerService()
app.post('/api/shorturl',
  (req, res, next) => {
    req.body.ip = req.ip
    next()
  },
  async (req, res) => {

    const { url, ip } = req.body
    
    const domain=url.replace('https://','')
    .replace('http://','').split('/')[0]

    console.log("🚀 ~ domain:", domain)

    dns.lookup(domain, (err, address, family) => {
      if (err) {
        return res.json({ error: 'invalid url' })
      }
    });

    let urlsave = await service.store(url, ip)
    
    return res.json({
      original_url: url,
      short_url: urlsave.short_url
    })
  }
)

app.get('/api/shorturl/:id', async (req, res) => {

  let url = await service.findByShortId(req.params.id)

  res.redirect(url.url)
})


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
