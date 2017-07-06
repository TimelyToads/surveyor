const Job = require("../database/models/Job.js");

let parseIndeedAPIData = (indeedData) => {

  console.log('Inside: parseIndeedAPIData with data to parse', indeedData);
    let jobs = JSON.stringify(indeedData).replace(/<b>/g, "");
    jobs = jobs.replace(/<\/b>/g, "");
    jobs = JSON.parse(jobs)
    
    let jobsArray = jobs.results.map( job => {
      return new Job(
        job.jobtitle,
        job.company,
        job.city,
        job.state,
        job.snippet,
        job.url,
        job.formattedRelativeTime,
        job.formattedLocation,
        "Indeed"
      );
    });

    return jobsArray;
}

let parseDiceAPIData = (diceData) => {
  diceData = diceData.data.resultItemList;
  console.log('Inside parseDiceAPIData with data to parse ', typeof diceData);

   
    
    let jobsArray = diceData.map( job => {
      return new Job(
        job.jobTitle,
        job.company,
        job.location.substring(0, job.location.indexOf(',')),
        job.location.substring(job.location.indexOf(','), job.location.length),
        "No description provided",
        job.detailUrl,
        job.date,
        job.location,
        "Dice"
      );
    });

    return jobsArray;
}


module.exports = {
  parseIndeedAPIData: parseIndeedAPIData,
  parseDiceAPIData: parseDiceAPIData
}