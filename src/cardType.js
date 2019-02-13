import creditCardType from 'credit-card-type';

const cardtype = (value) => {
  let result = null;

  if (
    (typeof value === 'string' && value.length > 0) ||
    typeof value === 'number'
  ) {
    const data = creditCardType(
      parseInt(value.toString().replace(/ /g, ''), 10).toString()
    );

    if (data.length) {
      result = data[0].niceType;
    }

    return result;
  }

  return result;
};

export default cardtype;