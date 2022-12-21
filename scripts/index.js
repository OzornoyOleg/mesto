import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"

const popupAddCard = document.querySelector('.popup_type_add')
const popupInputName = document.querySelector('.popup__input_type_name')
const popupDescription = document.querySelector('.popup__input_type_description')
const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const profileEdit = profile.querySelector('.profile__edit-button')
const imageAddPopup = profile.querySelector('.profile__add-button')
const popupEditProfile = document.querySelector('.popup_type_edit')
const formElementEdit = popupEditProfile.querySelector('.popup__form_type_edit')
const formElementAdd = document.querySelector('.popup__form_type_add')
const profileEditForm = document.querySelector('.popup__form_type_edit')
const cardAddForm = document.querySelector('.popup__form_type_add')
const gridElements = document.querySelector('.elements')
const popupInputAddName = document.querySelector('.popup__input_type_card-name')
const popupAddDescription = document.querySelector('.popup__input_type_card-description')
const popupEls = document.querySelectorAll('.popup')
const escButton = 'Escape'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileEditValidator = new FormValidator (config, profileEditForm)
const cardAddValidator = new FormValidator (config, cardAddForm)

cardAddValidator.enableValidation()
profileEditValidator.enableValidation()


initialCards.forEach((item) => {
  const card = new Card(item, '.grid-element')
  const cardElement = card.generateCard()
  gridElements.append(cardElement)
})

function closeByEsc(evt) {
  if (evt.key === escButton) {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup); 
  }
}

function openPopup (popup) {  
  popup.classList.add('popup_active')
  document.addEventListener('keydown',  closeByEsc)
}

function closePopup (popup) {
  popup.classList.remove('popup_active')
  document.removeEventListener('keydown',  closeByEsc)
}

popupEls.forEach( function(popupEl) {
  const popupCloseBtnEl = popupEl.querySelector('.popup__close');
  popupCloseBtnEl.addEventListener('click', function() {
    closePopup(popupEl)
  })
  popupEl.addEventListener('mousedown', function (evt) {
    if (evt.target === popupEl) {
      closePopup(popupEl)
    }
  })
})

gridElements.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('elements__trash')) {
    const gridItem = evt.target.closest('.elements__element');
      gridItem.remove();
    }
})

gridElements.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('elements__like')) {
    evt.target.classList.toggle('elements__like_active');
    }
})

const submitAddFormHandler = function (e) {
  e.preventDefault()
  const newElement = {
    name: popupInputAddName.value,
    link: popupAddDescription.value
  }
  const card = new Card(newElement, '.grid-element')
  const cardElement = card.generateCard()
  gridElements.prepend(cardElement)
  closePopup(popupAddCard)
}

formElementAdd.addEventListener('submit', submitAddFormHandler)

formElementEdit.addEventListener('submit', submitEditFormHandler)

imageAddPopup.addEventListener('click', function (){
  formElementAdd.reset()
  openPopup(popupAddCard)
})

profileEdit.addEventListener('click', function (){
  openPopup(popupEditProfile)
  popupInputName.value = profileTitle.textContent
  popupDescription.value = profileSubtitle.textContent
})

function submitEditFormHandler (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupInputName.value
  profileSubtitle.textContent = popupDescription.value
  closePopup(popupEditProfile)
}



