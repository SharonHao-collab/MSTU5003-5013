const form = document.querySelector('#visit-form');
const registration = document.querySelector('#registration');
const confirmation = document.querySelector('#confirmation');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  for (const field of [form.elements.name, form.elements.reason]) {
    field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field with more than spaces.');
  }
  if (!form.reportValidity()) return;
  registration.hidden = true;
  confirmation.hidden = false;
  document.querySelector('#confirmation-title').focus();
});
form.addEventListener('input', (event) => event.target.setCustomValidity(''));
document.querySelector('#restart').addEventListener('click', () => {
  form.reset();
  confirmation.hidden = true;
  registration.hidden = false;
  document.querySelector('#guest-name').focus();
});
