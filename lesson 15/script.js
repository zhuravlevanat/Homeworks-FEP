'use strict';

class ContactLog {
  static FORM_ADD_CONTACT_ID = 'form-add-contact';
  static INPUT_FIRST_NAME_ID = 'first-name';
  static INPUT_LAST_NAME_ID = 'last-name';
  static INPUT_PHONE_ID = 'tel';
  static ROW_TEMPLATE_ID = 'rowTemplate';
  static TABLE_BODY_ID = 'table-body';
  static BTN_DELETE_CLASS = 'delete-btn';
  
  formAddContact = document.getElementById(ContactLog.FORM_ADD_CONTACT_ID);
  firstNameInput = document.getElementById(ContactLog.INPUT_FIRST_NAME_ID);
  lastNameInput = document.getElementById(ContactLog.INPUT_LAST_NAME_ID);
  phoneInput = document.getElementById(ContactLog.INPUT_PHONE_ID);
  tableBody = document.getElementById(ContactLog.TABLE_BODY_ID);
  rowTemplate = document.getElementById(ContactLog.ROW_TEMPLATE_ID).innerHTML;

  constructor(){
    this.setFocus(this.firstNameInput);
    this.bindEventListeners();    
  }

  setFocus(input) {
    input.focus();
  }

  onAddContactFormSubmit(event) {
    event.preventDefault();
    this.submitForm();
  }

  onTableContactsClick(event) {
    if (event.target.classList.contains(ContactLog.BTN_DELETE_CLASS))
      this.deleteContact(event.target.parentElement);
  }

  createContact(firstName, lastName, phone) {    
    let rowTemplate = this.rowTemplate.replace('{{firstName}}', firstName)
                                            .replace('{{lastName}}', lastName)
                                            .replace('{{phone}}', phone);
    this.tableBody.innerHTML += rowTemplate;
  }

  deleteContact(elem) {
    elem.remove();
  }

  isFormValid() {
    return (this.firstNameInput.value) 
            && (this.lastNameInput.value) 
            && (this.phoneInput.value);
  }

  clearForm() {
    this.formAddContact.reset();
  }

  submitForm() {
    const firstName = this.firstNameInput.value.trim();
    const lastName = this.lastNameInput.value.trim();
    const phone = this.phoneInput.value.trim();

    if (this.isFormValid()) {
      this.createContact(firstName, lastName, phone);
      this.clearForm();
      this.setFocus(this.firstNameInput);
    }

   }
  
  bindEventListeners() {
    this.formAddContact.addEventListener('submit', this.onAddContactFormSubmit.bind(this));
    this.tableBody.addEventListener('click', this.onTableContactsClick.bind(this));
 }
}

const contacts = new ContactLog();