const express = require('express');
const bodyParser = require('body-parser');
const indeed = require('./externals/indeed.js');

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const mime = require('mime');

const models = require('../database/models/models.js')
const helpers = require('../database/helpers.js');
const pgp = require('pg-promise')();
// pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);
console.log('DB URL: ', process.env.DATABASE_URL);

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

// Google Auth



app.post('/', (req, res, next) => {
  console.log('\nindex.js POST request to /  with request: ');
  let userReq = {
    body: req.body.query,
    ip: req.headers['x-forwarded-for'],
    userAgent: req.get('user-agent')
  }
  indeed.getJobPostings(userReq, res);
});

// app.post('/', (req, res, next) => {
//   console.log('\nindex.js POST request to / \n');
//   let userReq = {
//     body: req.body.query,
//     ip: req.headers['x-forwarded-for'],
//     userAgent: req.get('user-agent')
//   }
//   indeed.getJobPostings(userReq, res);
// });


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

app.get('/api/users/:id', (req, res) => {
  console.log('GET /api/users');
  helpers.getUser(req.params.id)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch( (error) => {
      console.log('\t', error.message);
      res.status(error.status).json(error);
});

app.post('/saveQuery', (req, res) => {
  console.log('index.js POST call to /saveQuery');
  db.query(`SELECT * FROM users WHERE facebook_id = '${req.body.id}'`)
    .then(result => {
      console.log('Successfully retrieved from USERS table: ', result);
      if (result.length === 0) {
        console.log('ID or FBID? --- ', req.body.id);
        db.query(`INSERT INTO "public"."users"("facebook_id") VALUES(${req.body.id}) RETURNING "id", "facebook_id";`);
        throw notInDb;
      }
      return result[0].id;
    })
    .error( error => {
      console.log('\tServer Error', error);
      res.sendStatus(500);
    });
})

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

// app.post('/load', (req, res) => {
//   console.log('index.js POST request to /load');

//   db.query(`SELECT * FROM users WHERE facebook_id = '${req.body.id}'`)
//     .then(result => {
//       console.log('Successfully retrieved users from USER table with result: ', result);
//       if (result.length === 0) {
//         throw doNotAutoLoad
//       }
//       return result[0].id;
//     })
//     .then(user_id => {
//       db.query(`SELECT keywords FROM resumes WHERE user_id = '${user_id}'`)
//         .then(result => {
//           console.log('Successfully retrieved users from RESUME table with result: ', result);
//           res.send(result[0].keywords);
//         });
//     }) 
//     .catch(doNotAutoLoad => {
//       console.log('Catching doNotAutoLoad');
//       res.send();
//     })

// });

// app.post('/saveQuery', (req, res) => {
//   console.log('index.js POST call to /saveQuery');
//   db.query(`SELECT * FROM users WHERE facebook_id = '${req.body.id}'`)
//     .then(result => {
//       console.log('Successfully retrieved from USERS table: ', result);
//       if (result.length === 0) {
//         db.query(`INSERT INTO "public"."users"("facebook_id") VALUES('${req.body.id}') RETURNING "id", "facebook_id";`);
//         throw notInDb;
//       }
//       return result[0].id;
//     })
//     .then(user_id => {
//       console.log('Successfully retrieved userID: ', user_id);
//       db.query(`UPDATE "public"."resumes" SET "keywords"='${req.body.query}' WHERE "user_id"=${user_id} RETURNING "id", "user_id", "keywords";`);
//       res.send()        
//     })
//     .catch(notInDb => {
//       db.query(`SELECT id FROM users where facebook_id = '${req.body.id}'`)
//         .then(user_id => {
//           console.log('Successfully retrieved userID from users: ', user_id);
//           db.query(`INSERT INTO "public"."resumes"("user_id", "keywords") VALUES(${user_id[0].id}, '${req.body.query}') RETURNING "id", "user_id", "keywords";`);
//           res.send();
//         });
//     });
// });

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

// app.post('/', (req, res, next) => {
//   console.log('Inside POST at the end of the index.js');
//   indeed.indeed(req, res, next);
// });