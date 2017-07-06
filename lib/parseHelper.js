let parseIndeedAPIData = (data) => {
  console.log('PARSE: ', data);
    let jobs = JSON.stringify( data).replace(/<b>/g, "");
    jobs = jobs.replace(/<\/b>/g, "");
    console.log('Inside parseIndeedAPIData: ', JSON.parse(jobs));
    return JSON.parse(jobs);
}

module.exports = {
  parseIndeedAPIData: parseIndeedAPIData
}