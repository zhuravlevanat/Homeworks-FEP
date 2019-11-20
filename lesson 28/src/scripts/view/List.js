import $ from 'jquery';

export default class List {
  constructor(config) {
    this.config = config;
    this.$el = this.createElement();
    this.$addBtn = this.createAddBtn();
    this.$el.on('click', '.user-item', this.onListItemClick.bind(this))
    this.$addBtn.on('click', this.onAddUserBtnClick.bind(this));
  }

  onListItemClick(e) {
    const id = $(e.target).data('id');
    this.config.onItemClick(id);
  }

  onAddUserBtnClick() {
    
  }

  createAddBtn() {
    return $('<button id="addNewUserBtn">Add new</button>');
  }

  createElement() {
    return $('<div class="row users-list"></div>');
  }

  renderList(data) {
    this.$el.empty();
    data.forEach(item => this.renderListItem(item))
  }

  renderListItem({id, name, surname}) {
    this.$el.append(`<div class="user-item" data-id="${id}">${name} ${surname}</div>`)
  }
}