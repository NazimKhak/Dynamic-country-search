import './sass/index.scss';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryLInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(displayCountries, DEBOUNCE_DELAY)
);

function displayCountries(ev) {
  fetchcountries(ev.target.value);
  if (ev.target.value === '') {
    refs.countryLInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
  }
}

function createMarkup(information) {
  const html = information
    .map(element => {
      return `<li class='item'>
          <img src='${element.flag}' width='30' heigth='30' alt='flag image' />
          <p>${element.name}</p>
          <p>${element.capital}</p>
          <p>${element.languages[0].name}</p>
        </li>`;
    })
    .slice(0, 15)
    .join('');

  refs.countryList.innerHTML = html;
  if (information.length === 1) {
    const htmloneElement = information
      .map(element => {
        return `
        <div class ='flag_country'>
        <img src='${element.flag}' width='40' height="30"  alt='flag image' />
        <h2>${element.name}</h2>
        </div>
          <p><span>Capital: </span>${element.capital}</p>
          <p><span>Population: </span>${element.population}</p>
          <p><span>Language: </span>${element.languages[0].name}</p>
       `;
      })
      .slice('')
      .join('');
    refs.countryLInfo.innerHTML = htmloneElement;
    refs.countryList.innerHTML = '';
  }
}

function fetchcountries(countryName) {
  try {
    fetch(
      `https://restcountries.com/v2/name/${countryName}?fields=name,flag,capital,languages,population`
    )
      .then(response => {
        return response.json();
      })
      .then(countryInfo => {
        if (countryInfo.length > 10)
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name'
          );
        {
          if (countryInfo.length < 10) {
            createMarkup(countryInfo);
          }
        }
      });
  } catch (error) {
    console.log('ОШИБКа');
  }
}
