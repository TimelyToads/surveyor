const indeed = require('./indeed.js');
const fs = require('fs');
const path = require('path');
const API_KEYS = require('../../lib/api_keys.js');
// const analyzerUser = process.env.WATSONANALYZERUSER;
// const analyzerPass = process.env.WATSONANALYZERPASS;

const analyzerUser = API_KEYS.nlu_username;
const analyzerPass = API_KEYS.nlu_password;

let serverPath = path.join(__dirname, '../');
let NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

let natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': analyzerUser,
  'password': analyzerPass,
  'version_date': '2017-02-27'
});

let parseDocumentKeywords = (doc, callback) => {
  console.log('Inside naturalLanguageUnderstand.js analyze with doc');
  if (!doc) {
    callback('Document error', null);
    return;
  }

  doc.answer_units[0].content[0].text;

  var parameters = {
    'text': doc.answer_units[0].content[0].text,
    'features': {
      'entities': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      },
      'keywords': {
        'emotion': true,
        'sentiment': true,
        'limit': 2
      }
    },
    'language': 'en'
  }
  console.log('\n Parameters from doc.answer_units being passed to natural language understanding: ', parameters.text);
  natural_language_understanding.analyze(parameters, function(err, result) {
    if (err) {
      console.log('Error calling natural_language_understand.analyze w/ params: ', parameters);
      callback(err, null);
    }
    else {
      let keywords = result.keywords.map((keyword) => {
        return keyword.text;
      });
      console.log("Successfully retrieved keywords from natural_language_undertstanding: ", keywords);
      callback(null, keywords);
    }
  });
}

module.exports = {
  parseDocumentKeywords: parseDocumentKeywords
}