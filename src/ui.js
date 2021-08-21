class UI {
  constructor(){
    this.overlay = document.querySelector('.overlay');
  }

  openModal(modal){
    if(modal == null) return
    modal.classList.add('active');
    this.overlay.classList.add('active');
  }
  
  closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active');
    this.overlay.classList.remove('active');
  }
}

export const ui = new UI();