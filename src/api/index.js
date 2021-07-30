import axios from 'axios';

export const getCountries = () => axios.get('https://api.covid19api.com/countries');

export const getReportByCountry = (payload) => axios.get(`https://api.covid19api.com/dayone/country/${payload}`);


export const getMapDataByCountryId = (countryId) =>
  import(
    `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
);
