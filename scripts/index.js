const popupAddCard = document.querySelector('.popup_type_add')
const popupInputName = document.querySelector('.popup__input_type_name')
const popupDescription = document.querySelector('.popup__input_type_description')
const buttonsClosePopup = document.querySelectorAll('.popup__close')
const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const profileEdit = profile.querySelector('.profile__edit-button')
const imageAddPopup = profile.querySelector('.profile__add-button')
const popupEditProfile = document.querySelector('.popup_type_edit')
const formElementEdit = popupEditProfile.querySelector('.popup__form_type_edit')
const formElementAdd = document.querySelector('.popup__form_type_add')
const gridTemplate = document.querySelector('.grid-element').content.querySelector('.elements__element')
const gridElements = document.querySelector('.elements')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title')
const popupImageView = document.querySelector('.popup_type_image')
const popupInputAddName = document.querySelector('.popup__input_type_card-name')
const popupAddDescription = document.querySelector('.popup__input_type_card-description')
const popupEls = document.querySelectorAll('.popup')
const popupImageClose = popupImageView.querySelector('.popup__close')
const escButton = 'Escape'

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

function createCard (item) {
  const gridElement = gridTemplate.cloneNode(true)
  const gridElementName = gridElement.querySelector('.elements__name')
  const gridElementImage = gridElement.querySelector('.elements__image')
  gridElementName.textContent = item.name
  gridElementImage.src = item.link
  gridElementImage.alt = item.name
  gridElementImage.addEventListener('click', function () {
    openPopup(popupImageView)
    popupImage.src = item.link
    popupImage.alt = item.name
    popupImageTitle.textContent = item.name
  })
  const deleteButton = gridElement.querySelector('.elements__trash')
  deleteButton.addEventListener('click', function() {
    const gridItem = deleteButton.closest('.elements__element');
    gridItem.remove();
  })
  return gridElement
}

gridElements.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('elements__like')) {
    evt.target.classList.toggle('elements__like_active');
    }
})

popupImageClose.addEventListener('click', function() {
  closePopup(popupImageView)
})

initialCards.forEach(function(item) {
  const element = createCard(item)
  gridElements.append(element)
})

const submitAddFormHandler = function (e) {
  e.preventDefault()
  const newElement = {
    name: popupInputAddName.value,
    link: popupAddDescription.value
  }
  const element = createCard(newElement)
  gridElements.prepend(element)
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