export class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._image = data.link
    this._templateSelector = templateSelector
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__element')
    .cloneNode(true)

    return cardElement
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
  }

  _setEventListeners () {
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleOpenPopup()
    }) 
  }
}