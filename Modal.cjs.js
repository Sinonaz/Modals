class Modal {
  constructor() {
    this.openButtonElements = document.querySelectorAll(`[data-open-target]`);
    this.closeButtonElements =
      document.querySelectorAll(`[data-close-target]`);
    this.onOpenButtonClick = this.onOpenButtonClick.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onKeyboardPress = this.onKeyboardPress.bind(this);
  }

  _hideModal(modalElement) {
    this._fadeOut(modalElement);

    modalElement.dataset.isModalOpen = `false`;

    this._removeDocumentListeners();
  }

  _showModal(modalElement) {
    this._fadeIn(modalElement, 200, `flex`);

    modalElement.dataset.isModalOpen = `true`;

    this._addDocumentListeners();
  }

  onKeyboardPress(evt) {
    if (evt.code === `Escape`) {
      this.modalElement = document.querySelector(
        `[data-is-modal-open="true"]`
      );

      this._hideModal(this.modalElement);
    }
  }

  onCloseButtonClick(evt) {
    const self = evt.currentTarget;

    if (self.dataset.closeTarget) {
      this.modalElement = document.querySelector(
        `.${self.dataset.closeTarget}`
      );

      try {
        this._hideModal(this.modalElement);
      } catch (error) {
        console.error(this._getErrorMessage(self.dataset.closeTarget));
      }
    }
  }

  onOpenButtonClick(evt) {
    const self = evt.currentTarget;

    if (self.dataset.openTarget) {
      this.modalElement = document.querySelector(
        `.${self.dataset.openTarget}`
      );

      try {
        this._showModal(this.modalElement);
      } catch (error) {
        console.error(this._getErrorMessage(self.dataset.openTarget));
      }
    }
  }

  onDocumentClick(evt) {
    const target = evt.target;

    if (Boolean(target.dataset.isModalOpen)) {
      this._hideModal(target);
    }
  }

  _fadeIn(element, timeout, display) {
    element.style.opacity = 0;
    element.style.display = display || 'block';
    element.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
      element.style.opacity = 1;
    }, 10);
  }

  _fadeOut(element, timeout) {
    element.style.opacity = 1;
    element.style.transition = `opacity ${timeout}ms`;
    element.style.opacity = 0;

    setTimeout(() => {
      element.style.display = 'none';
    }, timeout);
  }

  _getErrorMessage(selector) {
    return `Can't find modal selector. Selector for search: .${selector}`;
  }

  _addDocumentListeners() {
    document.addEventListener(`click`, this.onDocumentClick);
    document.addEventListener(`keydown`, this.onKeyboardPress);
  }

  _removeDocumentListeners() {
    document.removeEventListener(`click`, this.onDocumentClick);
    document.removeEventListener(`keydown`, this.onKeyboardPress);
  }

  init() {
    if (this.openButtonElements.length) {
      this.openButtonElements.forEach((openButton) =>
        openButton.addEventListener(`click`, this.onOpenButtonClick)
      );
    }

    if (this.closeButtonElements.length) {
      this.closeButtonElements.forEach((closeButton) =>
        closeButton.addEventListener(`click`, this.onCloseButtonClick)
      );
    }
  }
}

module.exports = Modal;
