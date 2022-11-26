const popupAdd = document.querySelector('.popup_type_add')
const popupInputName = document.querySelector('.popup__input_type_name')
const popupDescription = document.querySelector('.popup__input_type_description')
const popupClose = document.querySelectorAll('.popup__close')
const profile = document.querySelector('.profile')
const profileTitle = profile.querySelector('.profile__title')
const profileSubtitle = profile.querySelector('.profile__subtitle')
const profileEdit = profile.querySelector('.profile__edit-button')
const imageAddPopup = profile.querySelector('.profile__add-button')
const popupEdit = document.querySelector('.popup_type_edit')
const formElementEdit = popupEdit.querySelector('.popup__form_type_edit')
const formElementAdd = document.querySelector('.popup__form_type_add')
const gridTemplate = document.querySelector('.grid-element').content.querySelector('.elements__element')
const gridElements = document.querySelector('.elements')
const popupCloseBt = popupAdd.querySelector('.popup__close')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__image-title')
const popupImageView = document.querySelector('.popup_type_image')
const popupInputAddName = document.querySelector('.popup__input_type_card-name')
const popupAddDescription = document.querySelector('.popup__input_type_card-description')
const popupEls = document.querySelectorAll('.popup')

function openPopup (popup) {  
  popup.classList.add('popup_active')
}

function closePopup (popup) {
  popup.classList.remove('popup_active')
}

popupEls.forEach( function(popupEl) {
  const popupCloseBtnEl = popupEl.querySelector('.popup__close');
  popupCloseBtnEl.addEventListener('click', function() {
    popupEl.classList.remove('popup_active')
  })
})

function createElements (item) {
  const gridElement = gridTemplate.cloneNode(true)
  gridElement.querySelector('.elements__name').textContent = item.name
  gridElement.querySelector('.elements__image').src = item.link
  gridElement.querySelector('.elements__image').alt = item.name
  gridElement.querySelector('.elements__like').addEventListener('click', function (event) {
    event.target.classList.toggle('elements__like_active')
  })
  const gridImageElement = gridElement.querySelector('.elements__image')
  gridImageElement.addEventListener('click', function () {
    popupImageView.classList.add('popup_active')
    let popupImageClose = popupImageView.querySelector('.popup__close')
    popupImageClose.addEventListener('click', function() {
      closePopup(popupImageView)
    })
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

initialCards.forEach(function(item) {
  const element = createElements(item)
  gridElements.append(element)
})

const submitAddFormHandler = function (e) {
  e.preventDefault()
  const newElement = {
    name: popupInputAddName.value,
    link: popupAddDescription.value
  }
  const element = createElements(newElement)
  gridElements.prepend(element)
  closePopup(popupAdd)
}

formElementAdd.addEventListener('submit', submitAddFormHandler)

formElementEdit.addEventListener('submit', submitEditFormHandler)

imageAddPopup.addEventListener('click', function (){
  popupAddDescription.value = ''
  popupInputAddName.value = ''
  openPopup(popupAdd)
})

profileEdit.addEventListener('click', function (){
  openPopup(popupEdit)
  popupInputName.value = profileTitle.textContent
  popupDescription.value = profileSubtitle.textContent
})

function submitEditFormHandler (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupInputName.value
  profileSubtitle.textContent = popupDescription.value
  closePopup(popupEdit)
}