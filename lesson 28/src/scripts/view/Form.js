import $ from 'jquery';

export default class Form {
  constructor(config) {
    this.config = config;
    this.$el = this.createElement();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on('submit', (e) =>{e.preventDefault(); this.onFormSubmit()});
    this.$el.on('click', '.delete-button', this.onDeleteUserBtn.bind(this));
  }

  getFormData() {
    const obj = {};
    this.$el.serializeArray().forEach(({name, value}) => {
      obj[name] = value;
    });
    return obj
  }

  onFormSubmit() {
    const formData = this.getFormData();
    console.log(formData);
    this.config.onSubmit(formData);
    this.openNewUserForm();   
  }

  onDeleteUserBtn() {
    const id = $('#idInput').val();
    this.config.onDelete(id);
    this.openNewUserForm(); 
  }

  openNewUserForm() {
    this.$el.get(0).reset(); 
    $('#idInput').val('');
    $('#deleteUserBtn').addClass('hidden');
    $('#nameInput').focus();
  }

  createElement() {
    return $(`
    <form id="userForm">
      <input name = "name" class="u-full-width" type="text" placeholder="Name" id="nameInput">
      <input name = "surname" class="u-full-width" type="text" placeholder="Surname" id="surnameInput">
      <input name = "email" class="u-full-width" type="email" placeholder="test@mailbox.com" id="emailInput">
      <input class="button u-pull-left delete-button hidden" id="deleteUserBtn" type="button" value="Delete">
      <input class="button-primary u-pull-right submit-button" id="saveUserBtn" type="submit" value="Submit">
      <input name = "id" type="hidden" id="idInput">
    </form>
    `);
  }

  showData(data) {
    $('#deleteUserBtn').removeClass('hidden');
    this.$el[0][0].value = data.name;
    this.$el[0][1].value = data.surname;
    this.$el[0][2].value = data.email;
    this.$el[0][5].value = data.id;
    this.$el[0][4].value = 'Save';
  }


}