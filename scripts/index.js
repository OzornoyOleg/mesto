let popupAdd = document.querySelector('.popup_type_add')
let popupInputName = document.querySelector('.popup__input_type_name')
let popupDescription = document.querySelector('.popup__input_type_description')
let popupClose = document.querySelectorAll('.popup__close')
let profile = document.querySelector('.profile')
let profileTitle = profile.querySelector('.profile__title')
let profileSubtitle = profile.querySelector('.profile__subtitle')
let profileEdit = profile.querySelector('.profile__edit-button')
let addImage = profile.querySelector('.profile__add-button')
let popupEdit = document.querySelector('.popup_type_edit')
let formElementEdit = popupEdit.querySelector('.popup__form_type_edit')
let formElementAdd = document.querySelector('.popup__form_type_add')
let gridTemplate = document.querySelector('.grid-element').content.querySelector('.elements__element')
let gridElements = document.querySelector('.elements')
let popupCloseBt = popupAdd.querySelector('.popup__close')
let popupImage = document.querySelector('.popup__image')
let popupImageTitle = document.querySelector('.popup__image-title')
let popupImageView = document.querySelector('.popup_type_image')

let initialCards = [
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


const popupEls = document.querySelectorAll('.popup')

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
  gridElement.querySelector('.elements__like').addEventListener('click', function (event) {
    event.target.classList.toggle('elements__like_active')
  })
  const deleteButton = gridElement.querySelector('.elements__trash')
  deleteButton.addEventListener('click', function() {
    const gridItem = deleteButton.closest('.elements__element');
    gridItem.remove();
  })
  gridElement.addEventListener('click', function () {
  popupImageView.classList.add('popup_active')
  popupImage.src = item.link
  popupImageTitle.textContent = item.name
  })
  return gridElement
}

initialCards.forEach(function(item) {
  const element = createElements(item)
  gridElements.append(element)
})

const addElement = function (e) {
  e.preventDefault()
  const popupInputName = document.querySelector('.popup__input_type_card-name')
  const popupDescription = document.querySelector('.popup__input_type_card-description')
  const newElement = {
    name: popupInputName.value,
    link: popupDescription.value
  }
  const element = createElements(newElement)
  gridElements.prepend(element)
  popupEls.forEach (function (popupEl){
    popupEl.classList.remove('popup_active')
  })

}

formElementAdd.addEventListener('submit', addElement)

formElementEdit.addEventListener('submit', formSubmitHandler)


function openPopupEdit() {
  popupEdit.classList.add('popup_active')
  popupInputName.value = profileTitle.textContent
  popupDescription.value = profileSubtitle.textContent
}

profileEdit.addEventListener('click', openPopupEdit)

function openPopupAdd() {
  popupAdd.classList.add('popup_active')
}

addImage.addEventListener('click', openPopupAdd)

function formSubmitHandler (evt) {
  evt.preventDefault()
  profileTitle.textContent = popupInputName.value
  profileSubtitle.textContent = popupDescription.value
  popupEls.forEach (function (popupEl){
    popupEl.classList.remove('popup_active')
  })
}






































