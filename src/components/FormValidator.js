export  class FormValidator {
    constructor(formElement, setting) {
      this._formElement = formElement;
      this._inputSelector = setting.inputSelector;
      this._submitButtonSelector = setting.submitButtonSelector;
      this._inactiveButtonClass = setting.inactiveButtonClass;
      this._inputErrorClass = setting.inputErrorClass;
      this._errorClass = setting.errorClass;
    }
  
    //показ ошибки поля
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputElement.validationMessage;
    }
  
    // скрыть
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.name}-error`
      );
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  
    // проверка валидности
    _checkInputValidity(inputElement) {
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
      } else {
        this._showInputError(inputElement);
      }
    }
  
    _hasInvalidInput(inputs) {
      return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
  
    // если поле валидное то кнопка вкл
    _toggleButtonState(inputs, buttonSubmit) {
      if (this._hasInvalidInput(inputs)) {
        buttonSubmit.classList.add(this._inactiveButtonClass);
        //buttonSubmit.disabled = true;
        buttonSubmit.setAttribute("disabled", true);
      } else {
        buttonSubmit.classList.remove(this._inactiveButtonClass);
        //buttonSubmit.disabled = false;
        buttonSubmit.removeAttribute("disabled");
      }
    }
  
    //слушатель
  
    _setEventListener() {
      const inputs = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      const buttonSubmit = this._formElement.querySelector(
        this._submitButtonSelector
      );
      this._toggleButtonState(inputs, buttonSubmit);
  
      inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputs, buttonSubmit);
        });
      });
    }
  
    enableValidation() {
      this._setEventListener();
    }
  }
  