
import ContrySelector from './components/ContrySelector/index';
import HighLight from './components/Highlight/index';
import Summary from './components/Summary/index';
import * as api from './api/index';
import {useEffect, useState} from 'react';
import {sortBy} from 'lodash';
import moment from 'moment';
import { Container, Typography } from '@material-ui/core';
import 'moment/locale/vi';
moment.locale('vi');
function App() {

  const [countries, setCountries] = useState([]);
  const [selectCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);
  useEffect(() => {
    const fetchCountry = async () => {
      const res = await api.getCountries();
      // console.log(res.data);
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);
      setSelectedCountryId('vn');
    }
    fetchCountry();
  },[])

  const handleOnChange = (e) => {
    // console.log(e.target.value);
    setSelectedCountryId(e.target.value);
  }
  useEffect(() => {
   const fetchCountry = async () => {
    if(selectCountryId !== ''){
      const { Slug } = countries.find(i => i.ISO2.toLowerCase() === selectCountryId);
      // console.log(Slug);
      const res = await api.getReportByCountry(Slug);
      // console.log(res.data);
      res.data.pop(); //Remove last value bc it still be continue, not end of day
      // console.log(res.data);
      setReport(res.data);
     }
   }
   fetchCountry();
  },[selectCountryId, countries])

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <ContrySelector countries={countries} handleOnChange={handleOnChange} value={selectCountryId} />
      <HighLight report={report}/>
      <Summary report={report} selectCountryId={selectCountryId}/>
    </Container>
  );
}

export default App;
