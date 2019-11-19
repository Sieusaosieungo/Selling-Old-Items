export const numberToNumberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberWithNonCommasToNumber = x => {
  return x.split(',').join('');
};
