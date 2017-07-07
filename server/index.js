const express = require('express');
const bodyParser = require('body-parser');
const indeed = require('./externals/indeed.js');

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');

const models = require('../database/models/models.js')
const helpers = require('../database/helpers.js');

const docConverter = require('./externals/docconverter.js');
const docAnalyzer = require('./externals/naturalLanguageUnderstanding.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/temp');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

app.use(multer({storage: storage}).any());

app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res, next) => {
  console.log('\nindex.js POST request to /  with request: ');
  let userReq = {
    body: req.body.query,
    ip: req.headers['x-forwarded-for'],
    userAgent: req.get('user-agent')
  }
  indeed.getJobPostings(userReq, res);
});

app.post('/upload', (req, res, next) => {
  console.log('index.js POST request to /upload');

  //Convert the document using Watson documentConversionV1
  docConverter.convertDoc(req, (error, convertedDoc) => {
    
    if (convertedDoc) {
      docAnalyzer.parseDocumentKeywords(convertedDoc, (err, keywords) => {
        if (err) { res.send(error);}
        res.send(keywords);
      })
    }
    
    if (error) { res.send(error); }
  }); 
});

/****************BEGIN RESTFUL API******************/

app.get('/api/users/:username', (req, res) => {
  console.log('GET /api/users/:username');
  helpers.getUser(req.params.username)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch( (error) => {
      console.log('\t', error.message);
      res.status(error.status).json(error);
  });
});

app.post('/api/users', (req, res) => {
  console.log('POST /api/users');
  models.User.forge(req.body).save()
    .then((user) => {
      console.log('\tSUCCESS');
      res.status(201).json(user);
    })
    .catch( (err) => {
      const message = 'Unable to create user';
      console.log('\t', message, err);
      res.status(500).send({message});
    });
});

app.post('/api/users/:username/jobs', (req, res) => {
  console.log('POST /api/users/:username/jobs');
  req.body.username = req.params.username;
  console.log(req.body);
  models.Job.forge(req.body).save()
    .then( (job) => {
      console.log('\tSUCCESS');
      res.status(201).json(job);
    })
    .catch( err => {
      const message = 'Unable to save job';
      console.log('\t', message, err);
      res.status(500).send({message});
    });
})

app.get('/api/users/:username/jobs', (req, res) => {
  console.log('GET /api/users/:username/jobs');
  models.Job.forge().query('where', 'username', '=', req.params.username).fetchAll()
    .then( jobs => {
      console.log(jobs.toJSON());
      res.status(200).json(jobs);
    })
    .catch( error => {
      const message = 'Cannot get user jobs';
      console.log('\t', message, error);
      res.status(500).send({message});
    })
})

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});
