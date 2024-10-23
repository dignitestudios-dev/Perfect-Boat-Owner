import moment from "moment/moment"

// *Date Format
export const getUnixDate = (date) => {
  if (date && moment(date).isValid()) {
    return moment(date * 1000).format('DD/MM/YYYY');
  }
  return undefined;
}


export const getMonthNameDate = (date) => {
  if (date && moment(date).isValid()) {
    return moment(date).format('MMM D YYYY'); 
  }
  return undefined;
}
