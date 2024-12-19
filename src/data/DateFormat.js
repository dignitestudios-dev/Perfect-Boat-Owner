import moment from "moment/moment";

export const getUnixDate = (date) => {
  if (date && moment(date).isValid()) {
    // Convert Unix timestamp to local time and format it
    return moment.unix(date).local().format("MM-DD-YYYY");
  }
  return undefined;
};

export const getMonthNameDate = (date) => {
  if (date && moment(date).isValid()) {
    return moment(date).format("MMM D YYYY");
  }
  return undefined;
};
