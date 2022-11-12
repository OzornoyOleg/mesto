let popup = document.querySelector('.popup')
let popupInputName = popup.querySelector('.popup__input_name')
let popupDescription = popup.querySelector('.popup__input_description')
let popupClose = popup.querySelector('.popup__close')
let profile = document.querySelector('.profile')
let profileTitle = profile.querySelector('.profile__title')
let profileSubtitle = profile.querySelector('.profile__subtitle')
let profileEdit = profile.querySelector('.profile__edit-button')
let formElement = document.querySelector('.popup__container')

function popupOpened() {
  popup.classList.add('popup_active')
  popupInputName.value = profileTitle.textContent
  popupDescription.value = profileSubtitle.textContent
}

function popupClosed() {
  popup.classList.remove('popup_active')
}


function formSubmitHandler (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupInputName.value
  profileSubtitle.textContent = popupDescription.value
  popupClosed()
}



profileEdit.addEventListener('click', popupOpened)

popupClose.addEventListener('click', popupClosed)

formElement.addEventListener('submit', formSubmitHandler)







