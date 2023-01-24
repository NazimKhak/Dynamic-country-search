export default fetchcountries;
function fetchcountries(countryName) {
  return fetch(
    `https://restcountries.com/v2/name/${countryName}?fields=name,flag,capital,languages,population`
  ).then(response => {
    return response.json();
  });
}
