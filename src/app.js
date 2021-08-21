// IMPORTS
import {ui} from './ui.js';

// DOM CONSTANTS
const openModalButtons = document.querySelectorAll('[data-target]');
const closeModalButtons = document.querySelectorAll('[data-dismiss]');
const overlay = document.querySelector('.overlay');

// EVENT LISTENERS
// Desktop 'click' Event Listeners
openModalButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    const modal = document.querySelector(button.dataset.target);
    ui.openModal(modal);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    const modal = button.closest('.modal');
     ui.closeModal(modal);
  });
});

overlay.addEventListener('click', ()=>{
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    ui.closeModal(modal);
  });
});

// Smartphone 'touchstart' event listeners
openModalButtons.forEach(button => {
  button.addEventListener('touchend', ()=>{
    const modal = document.querySelector(button.dataset.target);
    ui.openModal(modal);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('touchend', ()=>{
    const modal = button.closest('.modal');
     ui.closeModal(modal);
  });
});

overlay.addEventListener('touchend', ()=>{
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    ui.closeModal(modal);
  });
});