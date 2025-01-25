const parseNumber = (value: string, to = 'int'): number => {
  let parsedValue = 0;
  if (to === 'int') {
    parsedValue = Number.parseInt(value);
  } else {
    parsedValue = Number.parseFloat(value);
  }

  return isNaN(parsedValue) ? 0 : parsedValue;
};

export default parseNumber;
