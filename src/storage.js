export default class Storage{
  constructor(){
    this.city;
    this.defaultCity = 'London';
  }

  getLocationData(){
    if((localStorage.getItem('location_city') === null)){
      this.city = this.defaultCity;
    } else{
      this.city=localStorage.getItem('location_city');
    }
    return this.city
  }

  setLocationData(city){
    localStorage.setItem('location_city', city);
  }
}