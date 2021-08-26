class UI {
  constructor(){
    this.overlay = document.querySelector('.overlay');
    this.weatherIcon = document.getElementById('weather_icon');
    this.temperature = document.getElementById('temperature');
    this.condition = document.getElementById('condition');
    this.time = document.getElementById('time');
    this.city = document.getElementById('city');
    this.country = document.getElementById('country');
    this.winds = document.getElementById('winds');
    this.pressure = document.getElementById('pressure');
    this.humidity = document.getElementById('humidity');
    this.uvIndex = document.getElementById('uv_index');
    this.airQuality = document.getElementById('air_quality');
    this.main = document.querySelector('.main-main');
    this.errorMessage = document.querySelector('.error-message');
    this.modal = document.getElementById('modal');

  }

  // Adds a class to modal and overlay to make them visible
  openModal(modal){
    if(modal == null) return
    modal.classList.add('active');
    this.overlay.classList.add('active');
  }
  
  //Removes a class from a modal and overlay to make the invisible
  closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active');
    this.overlay.classList.remove('active');
  }

  // Paints the data from the api into the UI
  paint(data){
    // console.log(this.getSharperImageUrl(`https:${data.current.condition.icon}`));
    this.weatherIcon.setAttribute('src', this.getSharperImageUrl(`https:${data.current.condition.icon}`));
    this.temperature.textContent = `${data.current.temp_c}°C`;
    this.condition.textContent = data.current.condition.text;
    this.time.textContent = this.getTime(data.location.localtime);
    this.city.textContent = data.location.name;
    this.country.textContent = data.location.country;
    this.winds.innerHTML = `: &ensp;${data.current.wind_kph} kmh, ${data.current.wind_dir}`;
    this.pressure.innerHTML = `: &ensp;${data.current.pressure_mb} milibars`;
    this.humidity.innerHTML = `: &ensp;${data.current.humidity} %`;
    this.uvIndex.innerHTML = `: &ensp;${data.current.uv}`;
    this.airQuality.innerHTML = `: &ensp;${this.getAirQuality(data.current.air_quality["us-epa-index"])}`;

    this.closeModal(this.modal);

    setTimeout(() => {
      this.makeMainVisible();
    }, 1000);
  }

  // Changes the class to make main visible
  makeMainVisible(){
    if(!this.main.classList.contains('active')){
      this.main.classList.add('active');
    }
  }

  // Gets time from localtime string
  getTime(localtime){
    const arr = localtime.split(' ');
    return this.getAM_PM(arr[1]); //Get a 12 hour system version
  }

  // Convert time to 12 hour system
  getAM_PM(time){
    const timeArr = time.split(':');
    let timeOfDay = 'AM';
    let minute = parseInt(timeArr[1]);
    let hour = parseInt(timeArr[0]);
    if (hour > 12){
      hour = hour - 12;
      timeOfDay = 'PM';
    }

    this.updateTime(hour, minute);
    if( hour < 10 && minute < 10){
      return `0${hour} : 0${minute} ${timeOfDay}`;
    } else if (hour < 10){
      return `0${hour} : ${minute} ${timeOfDay}`;
    } else if (minute < 10){
      return `${hour} : 0${minute} ${timeOfDay}`;
    } else {
      return `${hour} : ${minute} ${timeOfDay}`;
    }
  }

  // Updates the current time
  updateTime(hour, minute){
    let timeOfDay = 'AM';
    if (minute >= 60){
      minute = 0;
      hour ++;
    }

    if (hour > 12){
      timeOfDay = 'PM';
      hour = hour - 12;
    }
    if( hour < 10 && minute < 10){
      this.time.textContent =  `0${hour} : 0${minute} ${timeOfDay}`;
    } else if (hour < 10){
      this.time.textContent =  `0${hour} : ${minute} ${timeOfDay}`;
    } else if (minute < 10){
      this.time.textContent =  `${hour} : 0${minute} ${timeOfDay}`;
    } else {
      this.time.textContent =  `${hour} : ${minute} ${timeOfDay}`;
    }
    minute ++;

    //To count 60 seconds before recurring
    setTimeout(() => {
      this.updateTime(hour, minute);
    }, 60000)

  }

  //Returns air quality interpretation
  getAirQuality(index){
    if(index == 1){
      return 'Good';
    } else if (index == 2){
      return 'Moderate';
    } else if (index == 3){
      return 'Unhealthy for sensitive groups';
    } else if (index == 4){
      return 'Unhealthy';
    } else if (index == 5){
      return 'Very unhealthy';
    } else if (index == 6){
      return 'Hazardous'
    } else {
      return 'Air quality unknown'
    }
  }

  //Replaces 64x64 with 128x128 for higher quality icons
  getSharperImageUrl(url){
    const resolution = /64x64/g;
    return url.replace(resolution, '128x128');
  }

  // Adds message and class to make error message visible
  showErrorMessage(msg){
    this.errorMessage.textContent = msg;
    if(!this.errorMessage.classList.contains('err-active')){
      this.errorMessage.classList.add('err-active');
      setTimeout(() => {
        this.hideErrorMessage();
      }, 3000);
    }
  }

  // Removes class to make error message invisible
  hideErrorMessage(){
    if(this.errorMessage.classList.contains('err-active')){
      this.errorMessage.classList.remove('err-active');
    }
  }

}

export const ui = new UI();