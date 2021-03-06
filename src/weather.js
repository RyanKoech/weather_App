// IMPORTS
import {http} from './http.js';
import {ui} from './ui.js';
import Storage from './storage.js';

class Weather{
  constructor(city) {
    this.apiKey = '3a9f4d8e82f944709af132632211308';
    this.city = city;
  }

  // Fetch Data from API
  fetchWeatherData(){
    http.get(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=yes`)
      .then(data => {
        if(typeof data.error !== 'undefined'){
          console.log(data.error.message);
          ui.showErrorMessage(data.error.message);
        }else{
          ui.paint(data);
          const localStorage = new Storage();
          localStorage.setLocationData(this.city);
          // console.log(data);
        }
      })
      .catch(err => {
        ui.showErrorMessage('Fatal Error. Contact the developer');
        console.log(err);
      });
  }

  // Changes value of city attribute
  setCity(city){
    this.city = city;
  }
}

export default Weather;