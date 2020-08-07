const object = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  } else {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputs, buttonSubmit, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove(inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(
          formElement,
          inputElement,
          inputErrorClass,
          errorClass
        );
        toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
      });
    });
  });
};

enableValidation(object);

