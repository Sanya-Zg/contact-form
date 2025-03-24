const radioButtons = document.querySelectorAll('.r_option');
const radioInput = document.querySelectorAll('input[type="radio"]');
const labels = document.querySelectorAll('label:not(.r_option)');
const form = document.querySelector('.form_block');
const inpName = document.getElementById('name');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const textArea = document.getElementById('textArea');
const checkBox = document.querySelector('input[type="checkbox"]');
const button = document.getElementById('button');
const successBlock = document.querySelector('.success_block');

const inputElements = [
  inpName, lastName, email, textArea
]

// Add * to labels
labels.forEach(label => {
  let spanEl = document.createElement('span');
  spanEl.textContent = '*';
  spanEl.classList.add('ml-8');
  label.insertAdjacentElement('beforeend', spanEl)
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  checkNames();
  checkRadioButtons();
  checkCheckbox();

  // If all checks are passed, we clear the form
  if (isFormValid()) {
    successBlock.style.display = 'block';
    setTimeout(() => {
      successBlock.style.display = 'none';
    }, 4000)

    resetForm();
  }
});

// Check if input name and last name are empty
function checkNames() {
  inputElements.forEach(name => {
    name.addEventListener('input', () => {
      let existingError = name.nextElementSibling; 
      
      if (name.value.trim() === '') {
        if (!existingError || !existingError.classList.contains('err')) {
          let spanError = document.createElement('span');
          spanError.textContent = 'This field is required';
          spanError.className = 'err';
          name.classList.add('err_border');
          name.insertAdjacentElement('afterend', spanError);
        }
      } else {
        if (existingError && existingError.classList.contains('err')) {
          existingError.remove();
          name.classList.remove('err_border');
        }
      }
    });

    name.dispatchEvent(new Event('input'));
  });
}
// Check if radio button is checked
function checkRadioButtons() {
  const isChecked = Array.from(radioInput).some(radio => radio.checked);
  const errorMsg = document.querySelector('.err_radio');

  if (isChecked) {
    if (errorMsg) errorMsg.remove();
  } else {
    if (!errorMsg) {
      let spanError = document.createElement('span');
      spanError.textContent = 'Please select a query type';
      spanError.className = 'err_radio';
      document.querySelector('.query_type_block').insertAdjacentElement('beforeend', spanError);
    }
  }
}
// Add background for radio buttons if active
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('click', (e) => {
    addBg(e);
    checkRadioButtons();
  });
})

function addBg(e) {
  radioButtons.forEach(button => button.classList.remove('bg_green'));
  e.currentTarget.classList.add('bg_green');
}

// Check if checkboxes are checked
function checkCheckbox() {
  const checkBoxCont = document.querySelector('.checkbox_block');
  let errorMsg = checkBoxCont.querySelector('.err');  

  if (!checkBox.checked) {
    if (!errorMsg) {  
      let spanEl = document.createElement('span');
      spanEl.textContent = 'To submit this form, please consent to being contacted';
      spanEl.classList.add('err');
      checkBoxCont.insertAdjacentElement('beforeend', spanEl);
    }
  } else {
    if (errorMsg) errorMsg.remove();     
  }
}

// Removing the error message when clicking on the checkbox
checkBox.addEventListener('input', () => {
  const checkBoxCont = document.querySelector('.checkbox_block');
  const errorMsg = checkBoxCont.querySelector('.err');  

  if (checkBox.checked && errorMsg) {
    errorMsg.remove();
  }
});

// Check if form is valid
function isFormValid() {
  let isValid = true;

  inputElements.forEach(input => {
    if (input.value.trim() === '') {
      isValid = false;
    }
  });

  if (!Array.from(radioInput).some(radio => radio.checked)) {
    isValid = false;
  }

  if (!checkBox.checked) {
    isValid = false;
  }

  return isValid;
}

// Reset form fields
function resetForm() {
  form.reset();
  document.querySelectorAll('.err').forEach(error => error.remove());
  document.querySelectorAll('.err_border').forEach(input => input.classList.remove('err_border'));
  radioButtons.forEach(button => button.classList.remove('bg_green'));
}