import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"
import { initialCards } from "./cards.js"

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
const popupImageView = document.querySelector('.popup_type_image')
const popupImageElement = document.querySelector('.popup__image')
const popupImageDescription = document.querySelector('.popup__image-title')
const escButton = 'Escape'

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


function createCardFromClass (data, template, handleImageClick) {
  return new Card(data, template, handleImageClick).generateCard() 
}

function handleImageClick (name, image)  {
  popupImageElement.src = image
  popupImageElement.alt = name
  popupImageDescription.textContent = name
  openPopup(popupImageView)
}

initialCards.forEach((item) => {
  gridElements.append(createCardFromClass(item, '.grid-element', handleImageClick))
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

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popup) => { 
  popup.addEventListener('mouseup', (event) => { 
    const targetClassList = event.target.classList; 
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

const submitAddFormHandler = function (e) {
  e.preventDefault()
  const newElement = {
    name: popupInputAddName.value,
    link: popupAddDescription.value
  }
  const cardElement = createCardFromClass(newElement, '.grid-element', handleImageClick)
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