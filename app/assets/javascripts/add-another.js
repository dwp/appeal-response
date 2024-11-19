
const removeInputElement = (e) => {
    const buttonElement = e.target;
    const formGroupElement = e.target.previousElementSibling;
    const divider = e.target.parentNode.querySelector('.govuk-section-break');
    
    // Focus on the previous input
    const previousElement = formGroupElement.previousElementSibling;
    if (previousElement.tagName === 'BUTTON') {
      const previousFormGroup = previousElement.previousElementSibling;
      previousFormGroup.querySelector('input[type="text"]').focus();
    } else if (previousElement.tagName === 'input')
     {
      previousElement.querySelector('input[type="text"]').focus();
    }
  
    // Remove the targeted element
    buttonElement.parentNode.removeChild(buttonElement);
    formGroupElement.parentNode.removeChild(formGroupElement);
    
    if(divider) {
        divider.parentNode.removeChild(divider);
    }    
  };
  
  const attachRemoveListeners = () => {
    const removeButtonElements = Array.from(document.querySelectorAll('.js-add-another-remove-button'));
  
    removeButtonElements.forEach((removeButtonElement) => {
      removeButtonElement.removeEventListener('click', removeInputElement);
      removeButtonElement.addEventListener('click', removeInputElement);
    });
  };
  
  const addAnother = (containerElements) => {
    attachRemoveListeners();
  
    containerElements.forEach((containerElement) => {
      const inputContainerElement = containerElement.querySelector('.js-add-another-input-container');
      const buttonElement = containerElement.querySelector('.js-add-another-button');
      const templateElement = document.getElementById('addAnotherTemplate');
  
      buttonElement.addEventListener('click', () => {
        const clonedElements = [];
  
        const allCurrentIndexElements = inputContainerElement.querySelectorAll('.js-index');
        const currentIndexArray = [];
        Array.from(allCurrentIndexElements).forEach((indexElement) => {
          currentIndexArray.push(Number(indexElement.innerText));
        });
  
        const nextIndex = Math.max(...currentIndexArray) + 1;
  
        Array.from(templateElement.children).forEach((child) => {
          clonedElements.push(child.cloneNode(true));
        });
  
        clonedElements.forEach((element) => {
          const clonedElement = element;
  
          if (clonedElement.className.includes('js-add-another-form-group')) {
            // update ID of the container so it can be picked up by auto complete component
            clonedElement.setAttribute('id', clonedElement.getAttribute('id').replace('Template', '') + nextIndex);
            clonedElement.setAttribute('class', clonedElement.className.replace('govuk-form-group--error', ''));
  
            const currentInput = clonedElement.querySelector('.govuk-input');
            const currentLabel = clonedElement.querySelector('.govuk-label');
            const labelIndexElement = clonedElement.querySelector('.js-index');
  
            currentInput.setAttribute('id', currentInput.getAttribute('id').replace('Template', '') + nextIndex);
            currentInput.setAttribute('name', currentInput.getAttribute('name').replace('Template', ''));
            // currentLabel.setAttribute('for', currentInput.getAttribute('id'));
  
            // labelIndexElement.innerHTML = nextIndex;
          } else if (clonedElement.className.includes('js-add-another-remove-button')) {
            // clonedElement.setAttribute('.js-add-another-remove-button-condition-count').innerHTML = inputCount;
  
            clonedElement.setAttribute('aria-label', clonedElement.getAttribute('aria-label') + nextIndex);
          }
  
          inputContainerElement.insertAdjacentElement('beforeend', clonedElement);
  
          if (clonedElement.className.includes('js-add-another-form-group')) {
            //const currentInput = clonedElement.querySelector('.autocomplete__input');
            //setupHealthConditionAutocomplete(clonedElement.id, currentInput.name);
  
            clonedElement.querySelector('input').focus();
          }
  
          // Remove any error if exist
          const errorMessage = clonedElement.querySelector('.govuk-error-message');
          if (errorMessage) {
            clonedElement.removeChild(errorMessage);
          }
        });
  
        attachRemoveListeners();
      });
    });
  };
  

document.addEventListener('DOMContentLoaded', () => {
    const addAnotherContainerElements = Array.from(document.querySelectorAll('.js-add-another-container'));
    if (addAnotherContainerElements) {
    addAnother(addAnotherContainerElements);
    }
});