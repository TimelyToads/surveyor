const fetch = require('isomorphic-fetch');
var DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1');
const FormData = require('form-data');
const fs = require('file-system');
const docAnalyzer = require('./naturalLanguageUnderstanding.js');
// const API_KEYS = require('../../lib/api_keys.js')
const converterUser = process.env.WATSONCONVERTERUSER;
const converterPass = process.env.WATSONCONVERTERPASS;
// const converterUser = API_KEYS.doc_conversion_username;
// const converterPass = API_KEYS.doc_conversion_password;

let convertDoc = (request, callback) => {
 console.log('\n Inside doconverter.js with doc: ', request.files[0].path);
	var document_conversion = new DocumentConversionV1({
  	username:     converterUser,
  	password:     converterPass,
  	version_date: '2015-12-01'
	});

	let docConversionInputs = {
		file: fs.createReadStream(request.files[0].path),
	  conversion_target: document_conversion.conversion_target.ANSWER_UNITS
	}

	let form = new FormData();
	form.append('config[conversion_target]', 'answer_units');

	console.log('converting document with watson....');
	document_conversion.convert(docConversionInputs,  (err, convertedDocument) => {
	  if (err) {
			console.log('Error converting document ', err);
			callback(err, null);
	  } else {
			console.log('\nSuccess. CONVERTED DOC OUTPUT: ', convertedDocument);
	    callback(null, convertedDocument);
	  }
	});
};


module.exports = {
	convertDoc: convertDoc
}
