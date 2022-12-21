export class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._image = data.link
    this._templateSelector = templateSelector
  }

  _getTemplate () {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true)
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._element.querySelector('.elements__name').textContent = this._name
    this._element.querySelector('.elements__image').src = this._image
    this._element.querySelector('.elements__image').alt = this._name
    return this._element
  }

  _handleOpenPopup () {
    document.querySelector('.popup__image').src = this._image
    document.querySelector('.popup__image-title').textContent = this._name
    document.querySelector('.popup_type_image').classList.add('popup_active')
    document.addEventListener('keydown', this._closeByEsc)
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_active')
      openedPopup.classList.remove('popup_active') 
      document.removeEventListener('keydown', this._closeByEsc)
    }
  }

  _setEventListeners () {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup()
    })
    this._likeElement = this._element.querySelector('.elements__like')
    this._likeElement.addEventListener('click', () => {
      this._likeElement.classList.toggle('elements__like_active')
    })
    this._trashElement = this._element.querySelector('.elements__trash')
    this._trashElement.addEventListener('click', () => {
      this._element.closest('.elements__element').remove()
    })
  }
}