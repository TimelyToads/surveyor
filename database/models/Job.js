class Job {
  constructor (title, company, city, state, description, url, postingDate, date,formattedLocation, sourceWebsite ) {
    this.title = title;
    this.company = company;
    this.city = city;
    this.state = state;
    this.description = description;
    this.url = url; 
    this.postingDate = postingDate;
    this.date = date;
    this.formattedLocation = formattedLocation;
    this.jobSourceWebsite = sourceWebsite;
  }


  getTitle() {
    return this.title;
  }

  getCompany() {
    return this.company;
  }

  getCity() {
    return this.city;
  }

  getState() {
    return this.state;
  }

  getDescription() {
    return this.description;
  }

  getUrl() {
    return this.url;
  }

  getPostingDate() {
    return this.postingDate;
  }

  getLocation() {
    return this.formattedLocation;
  }
}

module.exports = Job;