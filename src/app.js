// IMPORTS
import {ui} from './ui.js';
// import {http} from './http.js';
import Weather from './weather.js';

//Global Variables and constants
const weather = new Weather('London');


// DOM CONSTANTS
const openModalButtons = document.querySelectorAll('[data-target]');
const closeModalButtons = document.querySelectorAll('[data-dismiss]');
const overlay = document.querySelector('.overlay');
const saveButton = document.querySelector('#save_btn');
const cityInput = document.getElementById('city_input');

// EVENT LISTENERS
// Desktop 'click' Event Listeners
  // To open modal
openModalButtons.forEach(button => {
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    const modal = document.querySelector(button.dataset.target);
    ui.openModal(modal);
  });
});

  // To close modal
closeModalButtons.forEach(button => {
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    const modal = button.closest('.modal');
     ui.closeModal(modal);
  });
});

  //To close modal
overlay.addEventListener('click', ()=>{
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    ui.closeModal(modal);
  });
});

  //To initiate fetching weather data
saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  const city = cityInput.value;
  cityInput.value = '';

  if(city === ''){
    console.log('PLease enter a city');
    return
  }

  //Change City location
  weather.setCity(city);

  //Fetch data
  weather.fetchWeatherData();
});

// Smartphone 'touchstart' event listeners

  // To open modal
openModalButtons.forEach(button => {
  button.addEventListener('touchend', (e)=>{
    e.preventDefault();
    const modal = document.querySelector(button.dataset.target);
    ui.openModal(modal);
  });
});

  //To close modal
closeModalButtons.forEach(button => {
  button.addEventListener('touchend', (e)=>{
    e.preventDefault();
    const modal = button.closest('.modal');
    ui.closeModal(modal);
  });
});

  //To close Modal
overlay.addEventListener('touchend', ()=>{
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    ui.closeModal(modal);
  });
});