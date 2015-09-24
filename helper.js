var _this = this;
var time = require('time');
var date_regex = /(\d{2})\/(\w+)\/(\d{4}):(\d{2}):(\d{2}):(\d{2})/;

this.month = function(string) {
  switch(string) {
    case "Jan":
      month = "00";
      break;
    case "Feb":
      month = "01";
      break;
    case "Mar":
      month = "02";
      break;
    case "Apr":
      month = "03";
      break;
    case "May":
      month = "04";
      break;
    case "Jun":
      month = "05";
      break;
    case "Jul":
      month = "06";
      break;
    case "Aug":
      month = "07";
      break;
    case "Sep":
      month = "08";
      break;
    case "Oct":
      month = "09";
      break;
    case "Nov":
      month = "10";
      break;
    case "Dec":
      month = "11";
      break;
  }

  return month;
}

this.datetime = function(string) {
  date_parts = date_regex.exec(string);
  // console.log(parts);
  datetime = new time.Date(
    date_parts[3],
    _this.month(date_parts[2]),
    date_parts[1],
    date_parts[4],
    date_parts[5],
    date_parts[6],
    "America/Los_Angeles"
  );
  return datetime;
}

module.exports = {
  datetime: this.datetime,
  month:    this.month
};