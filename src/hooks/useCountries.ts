import countries from 'world-countries';

const formattedCountries = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region
}))

/**
* Since this hook has no state, I don't think there is any point to keeping this as a hook. It is just a means to abstract away some code for readability I assume. Some people - such as myself :) - argue that you should not make abstractions for the sake of readability. There is a fine line between abstracting code and obfuscating code
*
* You could just export some utility functions. Or maybe create a Countries class that expose these utility functions as methods?
*/
export const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find(item => item.value === value);
  };

  return { getAll, getByValue };
};

export default useCountries;
