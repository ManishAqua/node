const { getCountryCallingCode } = require('libphonenumber-js');
const codes = require('../constants/countries.json');

exports.getAllCodes = (req, res) => {
  const result = codes
    .filter((country) => country.status === true)
    .map((country) => ({
      name: country.name.common,
      flag: country.cca2,
      code: `+${getCountryCallingCode(country.cca2)}`,
    }));

  const response = {
    data: result,
  };

  res.json(response);
};
